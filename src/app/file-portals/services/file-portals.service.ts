import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal } from 'file-portals';
import { DomainsService } from './domain.service';
import { UserStorageService } from '../../shared/providers/user-storage.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { IConnection } from '../types/connection.type';


@Injectable({
  providedIn: 'root'
})
export class FilePortalsService {

    private connected: Promise<void>;
    private reader = new WebReader();
    private writer = new WebWriter();
    private socket: io.Socket;
    private user: IUser;

    constructor(private ngZone: NgZone,
                userStorageService: UserStorageService,
                private domainService: DomainsService) {

        const { peerDNS: { domain, port } } = environment;

        this.socket = io.connect(domain, { port });
        this.connected = new Promise((resolve) => {
            this.socket.once('connect', () => {
                console.info('Socket connected!');
                resolve();
            });
        });

        this.user = userStorageService.user.get();
    }

    private create(domain: string, id: string) {
        const { RTCConfiguration } = environment;
        const peer = new FilePeer(RTCConfiguration, 512);
        const portal = new FilePortal(this.reader, this.writer, peer, { name: this.user.nickname, type: 'client' });

        let connections = this.domainService.get.it(domain);

        if (!connections) {
            connections = this.domainService.create(domain);
        }
        const connection = { id, portal, peer }
        // Handle disconnection of the portal
        const subscription = portal.on.close.subscribe(() => {
            this.ngZone.run(async () => {
                connections.update((value) => {
                    const index = value.findIndex((connection) => connection.id === id);

                    if (index !== -1) {
                        value.splice(1, index);
                    }
                    
                    return value;
                });
                subscription.unsubscribe();
            });
        });
        return connection;
    }

    private get(id: string) {
        // Get all domains
        const domains = this.domainService.get.connected();
        // Get all open connections
        const connections = domains.map((domain) => this.domainService.get.it(domain)())
                                   .reduce((connections, connection) => connections.concat(connection), []);
        // Find portal in connection
        return connections.find((connection) => connection.id === id);
    }

    private save(domain: string, connection: IConnection) {
        const connections = this.domainService.get.it(domain);
        // Save connection
        connections.update((value) => {
            value.push(connection);
            return value;
        });

    }

    public async connect(domain: string) {
        // Wait socket to be connected
        await this.connected;
        // Check if user is listening on domain
        let connection = this.domainService.get.it(domain);
        
        if (!connection) {
            // Create a listening on domain
            connection = this.domainService.create(domain);
        }

        const pending: IConnection[] = []
        // Start listening for new connections on domain
        this.socket.on('link', async (link: { id: string, offer?: RTCSessionDescription }) => {
            console.log(new Date().getMilliseconds(), 'New link: ', link.id);
            // New offer from domain
            const { id, offer } = link;
            // Find connection on connected
            let connection = this.get(id);
            // Already connected
            if (connection) {
                console.log('Avoiding to connect');
            }
            // Find on pending
            connection = pending.find((connection) => connection.id === id);
            // If not exist create one
            if (!connection) {
                connection = this.create(domain, id);
                connection.portal.opening.then(() => {
                    console.log('Connected!');
                    this.save(domain, connection as IConnection);
                });
                pending.push(connection);
            }

            if (offer) {
                console.log(new Date().getMilliseconds(), 'Reciving offer: ', offer.type);
            } else {
                console.log(new Date().getMilliseconds(), 'Responsing connection...');
            }

            const { peer } = connection;
            console.log('Peer: ', peer);
            const response = await peer.connect(offer);

            if (response) {
                console.log(new Date().getMilliseconds(), 'Responsing with: ', { id, offer: response });
                // Emit response
                this.socket.emit('link', { id, offer: response });
            }
            // Check if there is an answer or response is type answer to emit candidates
            if (offer?.type === 'answer' || response?.type === 'answer') {
                const candidates = await peer.candidates.export();
                if (candidates.length) {
                    console.log('Exporting candidates: ', candidates.length);
                    this.socket.emit('candidates', { id, candidates });
                    return;
                }
                

                peer.on.candidate.subscribe((candidate) => {
                    console.log('Emitting candidates: ', candidate);
                    this.socket.emit('candidates', { id, candidates: [ candidate ] });
                });
            }
        });

        this.socket.on('candidates', async (connection: { id: string, candidates: RTCIceCandidate[] }) => {
            const { id, candidates } = connection;

            const { peer } = this.get(id) || pending.find((connection) => connection.id === id) || { };

            if (!peer) { 
                return;
            }

            console.log('Importing candidates: ', candidates.length);
            peer.candidates.import(candidates);
        });
        console.log('Querying to domain: ', domain);
        this.socket.emit('query', domain);

        return connection;
    }

    public close(domain: string) {
        // Stop listening for new connections on domain
        this.socket.emit('exit', domain);
        // Destroy live connections with peers
        const peers = this.domainService.get.it(domain);

        Object.values(peers()).forEach(({ portal }) => portal.shutdown());
    }
}
