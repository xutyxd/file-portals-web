import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeerDnsClientService {

    private connected: Promise<void>;
    private socket: io.Socket;

    public on = {
        link: new Subject<{ id: string, offer?: RTCSessionDescription, domain: string }>(),
        candidates: new Subject<{ id: string, candidates: RTCIceCandidate[] }>
    }

    constructor() {
        const { peerDNS: { domain, port } } = environment;

        this.socket = io.connect(domain, { port });
        this.connected = new Promise((resolve) => {
            this.socket.once('connect', () => {
                console.info('Socket connected!');
                resolve();
            });
        });

        this.socket.on('link', (event) => {
            this.on.link.next(event);
        });
        this.socket.on('candidates', (event) => {
            this.on.candidates.next(event);
        });
    }

    public async query(domain: string) {
        await this.connected;
        this.socket.emit('query', domain);
    }

    public send = {
        link: (message: { id: string, offer?: RTCSessionDescription, domain: string }) => {
            this.socket.emit('link', message);
        },
        candidates: (message: { id: string, candidates: RTCIceCandidate[] }) => {
            this.socket.emit('candidates', message);
        }
    }

    public exit(domain: string) {
        this.socket.emit('exit', domain);
    }
}
