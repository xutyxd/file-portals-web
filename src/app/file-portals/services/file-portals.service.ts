import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal } from 'file-portals';
import { DomainsService } from './domain.service';
import { UserStorageService } from '../../shared/providers/user-storage.service';
import { IUser } from '../../shared/interfaces/user.interface';


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
        console.log('User getted: ', this.user);
    }

    private create(domain: string, id: string) {
        const { RTCConfiguration } = environment;
        const peer = new FilePeer(RTCConfiguration, 512);
        const portal = new FilePortal(this.reader, this.writer, peer, { name: this.user.nickname, type: 'client' });

        let connection = this.domainService.get.it(domain);

        if (!connection) {
            connection = this.domainService.create(domain);
        }
        // Save connection
        connection.update((value) => {
            value[id] = { portal, peer };

            return value;
        });

        // Handle disconnection of the portal
        const subscription = portal.on.close.subscribe(() => {
            this.ngZone.run(async () => {
                connection.update((value) => {
                    delete value[id];
                    return value;
                });
                subscription.unsubscribe();
            });
        });

        return connection()[id];
    }

    private get(domain: string, id: string) {
        let portal = this.domainService.get.it(domain)()[id];

        if (!portal) {
            portal = this.create(domain, id);
        }

        return portal;
    }

    public async connect(domain: string) {
        // Wait socket to be connected
        await this.connected;
        // Check if user is listening on domain
        let connection = this.domainService.get.it(domain);
        
        if (!connection) {
            
            connection = this.domainService.create(domain);
        }

        // Start listening for new connections on domain
        this.socket.on('link', async (link: { id: string, offer?: RTCSessionDescription }) => {
            console.log('New connection: ', link);
            // New offer from domain
            const { id, offer } = link;
            // Create new portal to connect with it
            const { peer } = this.get(domain, id);
            const response = await peer.connect(offer);

            if (response) {
                // Emit response
                console.log('Emitting link: ', { id, offer: response });
                this.socket.emit('link', { id, offer: response });
            }
            // Check if there is an answer or response is type answer to emit candidates
            if (offer?.type === 'answer' || response?.type === 'answer') {
                const candidates = await peer.candidates.export();
                console.log('Emitting candidates: ', { id, candidates });
                this.socket.emit('candidates', { id, candidates });

                peer.on.candidate.subscribe((candidate) => {
                    console.log('Emitting on.candidates: ', { id, candidates });
                    this.socket.emit('candidates', { id, candidates: [ candidate ] });
                });
            }
        });

        this.socket.on('candidates', async (connection: { id: string, candidates: RTCIceCandidate[] }) => {
            console.log('Importing candidates: ', connection);
            const { id, candidates } = connection;

            const { peer } = this.get(domain, id);
            peer.candidates.import(candidates);
        });
        console.log('Querying in: ', domain);
        this.socket.emit('query', domain);

        return connection;
    }

    public close(domain: string) {
        // Stop listening for new connections on domain
        this.socket.emit('exit', domain);
    }
}
