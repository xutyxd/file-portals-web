import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal } from 'file-portals';

import { UserStorageService } from '../../shared/providers/user-storage.service';
import { DomainStored } from '../types/domain-stored.type';
import { DomainsService } from './domain.service';


@Injectable({
  providedIn: 'root'
})
export class FilePortalsService {

    private connected: Promise<void>;
    private domains = signal<{ [ domain: string ]: WritableSignal<{ [ socketId: string ]: { portal: FilePortal, peer: FilePeer } }> }>({ });
    private reader = new WebReader();
    private writer = new WebWriter();
    private socket: io.Socket;

    constructor(private domainService: DomainsService) {

        const { peerDNS: { domain, port } } = environment;

        this.socket = io.connect(domain, { port });
        this.connected = new Promise((resolve) => {
            this.socket.once('connect', () => {
                console.info('Socket connected!');
                resolve();
            });
        });
    }

    private create(domain: string, id: string) {
        const { RTCConfiguration } = environment;
        const peer = new FilePeer(RTCConfiguration, 512);
        const portal = new FilePortal(this.reader, this.writer, peer);

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
            connection.update((value) => {
                delete value[id];
                return value;
            });
            subscription.unsubscribe();
        });

        return connection()[id];
    }

    private get(domain: string, id: string) {
        let portal = this.domains()[domain]()[id];

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
        
        if (connection) {
            this.socket.emit('query', domain);
            return connection;
        }

        connection = this.domainService.create(domain);
        // Start listening for new connections on domain
        this.socket.on('link', async (link: { id: string, offer?: RTCSessionDescription }) => {
            // New offer from domain
            const { id, offer } = link;
            // Create new portal to connect with it
            const { peer } = this.get(domain, id);
            // console.log('Connecting with: ', id);
            console.log(`Connection with ${id} with offer of type ${offer?.type}`);
            const response = await peer.connect(offer);

            if (response) {
                // Emit response
                this.socket.emit('link', { id, offer: response });
            }
            // Check if there is an answer to emit candidates
            if (offer?.type === 'answer' || response?.type === 'answer') {
                const candidates = await peer.candidates.export();
                this.socket.emit('candidates', { id, candidates });
                console.log('Emitting candidates...');
            }
        });

        this.socket.on('candidates', (connection: { id: string, candidates: RTCIceCandidate[] }) => {
            const { id, candidates } = connection;

            const { peer } = this.get(domain, id);
            peer.candidates.import(candidates);
            // Import candidates
            console.log(`Candidates from ${ id }: ${ candidates.map(({ candidate }) => candidate).join(', ') }`);
            console.log('Candidates imported!');
        });

        this.socket.emit('query', domain);

        return connection;
    }

    public close(domain: string) {
        // Stop listening for new connections on domain
        this.socket.emit('exit', domain);
    }
}
