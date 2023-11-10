import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal } from 'file-portals';

@Injectable({
  providedIn: 'root'
})
export class FilePortalsService {

    private connected: Promise<void>;
    private domains: { [ domain: string ]: { [socketId: string]: { portal: FilePortal, peer: FilePeer } } } = { };
    private reader = new WebReader();
    private writer = new WebWriter();
    private socket: io.Socket;

    constructor() {

        const { peerDNS: { domain, port } } = environment;

        this.socket = io.connect(domain, { port });
        this.connected = new Promise((resolve) => {
            this.socket.once('connect', () => {
                console.info('Socket connected!');
                resolve();
            });
        });
    }

    private domain = {
        create: (domain: string) => {
            const connection = {  };

            this.domains[domain] = connection;
            return connection;
        },
        get: (domain: string) => {
            return this.domains[domain];
        },
        remove: (domain: string) => {
            delete this.domains[domain];
        }
    }

    private portal = {
        create: (domain: string, id: string) => {
            const { RTCConfiguration } = environment;
            const peer = new FilePeer(RTCConfiguration, 512);
            const portal = new FilePortal(this.reader, this.writer, peer);

            let connection = this.domain.get(domain);

            if (!connection) {
                connection = this.domain.create(domain);
            }
            // Save connection
            connection[id] = { portal, peer };
            // Handle disconnection of the portal
            portal.on.close.subscribe(() => {
                delete connection[id];
            });

            return connection[id];
        },
        get: (domain: string, id: string) => {
            let portal = this.domains[domain][id];

            if (!portal) {
                portal = this.portal.create(domain, id);
            }

            return portal;
        }
    }

    public async connect(domain: string) {
        // Wait socket to be connected
        await this.connected;
        // Check if user is listening on domain
        let connection = this.domain.get(domain);
        
        if (connection) {
            return connection;
        }

        connection = this.domain.create(domain);
        // Start listening for new connections on domain
        this.socket.on('link', async (link: { id: string, offer?: RTCSessionDescription }) => {
            // New offer from domain
            const { id, offer } = link;
            // Create new portal to connect with it
            const { peer } = this.portal.get(domain, id);
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

            const { peer } = this.portal.get(domain, id);
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
        // Delete from object
        this.domain.remove(domain);
    }
}
