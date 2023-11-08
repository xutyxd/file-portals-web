import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

import { WebReader, WebWriter } from 'file-portals';
import { FilePeer, FilePortal, FileTunnel } from 'file-portals';

@Injectable({
  providedIn: 'root'
})
export class FilePortalsService {

    private connected: Promise<void>;
    private portals: { [key: string]: { it: FilePortal, peer: FilePeer } } = { };
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

    private portal = {
        create: (id: string) => {
            const { RTCConfiguration } = environment;
            const peer = new FilePeer(RTCConfiguration, 512);
            const portal = new FilePortal(this.reader, this.writer, peer);

            this.portals[id] = { it: portal, peer };

            return this.portals[id];
        },
        get: (id: string) => {
            let portal = this.portals[id];

            if (!portal) {
                portal = this.portal.create(id);
            }

            return portal;
        }
    }

    public connect(domain: string) {
        this.socket.on('link', async (link: { id: string, offer?: RTCSessionDescription }) => {
            const { id, offer } = link;
            const { peer } = this.portal.get(id);
            console.log('Connecting with: ', offer);
            const response = await peer.connect(offer);

            if (!response || response.type === 'answer') {
                const candidates = await peer.candidates.export();
                console.log('Emitting candidates: ', candidates);
                this.socket.emit('candidates', { id, candidates });

                if (!response) {
                    return;
                }
            }
            console.log('Emitting link with: ', response);
            this.socket.emit('link', { id, offer: response });
        });

        this.socket.on('candidates', (connection: { id: string, candidates: RTCIceCandidate[] }) => {
            const { id, candidates } = connection;

            const { peer } = this.portal.get(id);
            peer.candidates.import(candidates);
            // Import candidates
            // const candidates = { id, candidates: [ { candidate: 'C' }, { candidate: 'D' } ] };
            console.log(`Candidates from ${ id }: ${ candidates.map(({ candidate }) => candidate).join(', ') }`);
            console.log('Candidates imported!');
        });

        this.socket.emit('query', domain);
    }
}
