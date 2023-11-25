import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal } from 'file-portals';
import { PeerDnsClient } from 'peer-dns-client';
import { UserStorageService } from '../../shared/providers/user-storage.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { IConnection } from '../types/connection.type';
import { DomainsService } from './domain.service';
import { DialogService } from '../../shared/services/dialog.service';


@Injectable({
  providedIn: 'root'
})
export class FilePortalsService {

    private reader = new WebReader();
    private writer = new WebWriter();
    private peerDnsClient = new PeerDnsClient(environment.peerDNS);

    private Connections: { id: string, portal: FilePortal, peer: FilePeer, domains: string[] }[] = [];
    private user: IUser;

    constructor(private ngZone: NgZone,
                private router: Router,
                private dialogService: DialogService,
                userStorageService: UserStorageService,
                private domainsService: DomainsService) {

        this.user = userStorageService.user.get();
        // Subscribe to dns service to get links
        this.peerDnsClient.on.link.subscribe(this.connections.connect);
        // Subscribe to dns services to get candidates
        this.peerDnsClient.on.candidates.subscribe(async ({ id, candidates }) => {
            // Find peer
            const { peer } = this.connections.get.by.id(id) || { };
            // Check peer exists
            if (!peer) {
                console.warn('Peer not exist still');
                return;
            }

            peer.candidates.import(candidates);
        });
    }

    private connections = {
        create: (id: string, domain: string) => {
            const { RTCConfiguration } = environment;
            const name = this.user.nickname;
            const peer = new FilePeer(RTCConfiguration, 512);
            const portal = new FilePortal(this.reader, this.writer, peer, { name, type: 'client' });
    
            const connection: IConnection = { id, portal, peer, domains: [ domain ] };
            // Handle disconnection of the portal
            const subscription = portal.on.close.subscribe(() => {
                this.ngZone.run(() => {
                    // Remove from domain
                    this.domainsService.remove(connection);
                    // Remove from connections
                    const index = this.Connections.findIndex(({ id }) => connection.id === id);

                    if (index !== -1) {
                        this.Connections.splice(index, 1);
                    }

                    subscription.unsubscribe();
                });
            });
    
            return connection;
        },
        get: {
            by: {
                id: (socketId: string) => {
                    return this.Connections.find(({ id }) => id === socketId);
                },
                domain: (domain: string) => {
                    return this.Connections.filter(({ domains }) => domains.includes(domain));
                }
            },
        },
        connect: async (link: { id: string, offer?: RTCSessionDescription, domain: string }) => {
            const { id, offer, domain } = link;
            // Find connection
            let connection = this.connections.get.by.id(id);
            // Check if exist to create it
            if (!connection) {
                connection = this.connections.create(id, domain);
                this.Connections.push(connection);
            } else {
                // Add domain to connection if not includes it
                const { domains } = connection;

                if (!domains.includes(domain)) {
                    domains.push(domain);
                    // Notify to the caller this peer
                    this.peerDnsClient.query(domain);
                }
            }
            // Check if opened
            const { portal, peer } = connection;
            const { opened } = portal;

            if (!opened) {
                // Try to connect
                const response = await peer.connect(offer);
                // Check if is it necesary to response
                if (response) {
                    // Emit response
                    this.peerDnsClient.send.link({ id, offer: response as RTCSessionDescription, domain });
                }
                // Check if candidates need to be emitted
                if (offer?.type === 'answer' || response?.type === 'answer') {
                    const candidates = await peer.candidates.export();
                    this.peerDnsClient.send.candidates({ id, candidates });
                    
                    peer.on.candidate.subscribe((candidate) => {
                        this.peerDnsClient.send.candidates({ id, candidates: [ candidate ] });
                    });

                    this.domainsService.update(domain, connection);
                }
            } else {
                this.domainsService.update(domain, connection);
            }
        }
    }

    public async open(domain?: string) {

        let portal = domain;

        if (!portal) {
            portal = await this.dialogService.prompt('Where do you want to connect?');
        }

        if (!portal) {
            return;
        }
        
        this.router.navigateByUrl(`portal/${portal}`);
    }

    public async connect(domain: string) {
        let connection = this.domainsService.get.it(domain);
        // Create a connection
        if (!connection) {
            connection = this.domainsService.create(domain);
        }

        this.peerDnsClient.query(domain);

        return connection;
    }

    public close(domain: string) {
        // Stop listening for new connections on domain
        this.peerDnsClient.exit(domain);
    }
}
