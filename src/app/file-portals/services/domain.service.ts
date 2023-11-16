import { Injectable, WritableSignal, signal } from '@angular/core';
import { FilePortal, FilePeer } from 'file-portals';
import { UserStorageService } from '../../shared/providers/user-storage.service';
import { IDomainStored } from '../types/domain-stored.type';
import { IConnection } from '../types/connection.type';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

    // private domains = signal<{ [ domain: string ]: WritableSignal<{ [ socketId: string ]: { portal: FilePortal, peer: FilePeer } }> }>({ });
    private domains: { [ domain: string ]: WritableSignal<IConnection[]> } = { };
    
    constructor(private userStorageService: UserStorageService) {
        const domains = userStorageService.get<IDomainStored[]>('domains') || [];

        domains.forEach(({ name }) => {
            this.domains[name] = signal([ ]);
        });
    }

    public create(domain: string) {
        const connection = signal<IConnection[]>([ ]);
        // Check if exists
        if (this.domains[domain]) {
            console.warn('Domain already exists!');
            return this.domains[domain];
        }

        this.domains[domain] = connection;

        const domains = this.userStorageService.get<IDomainStored[]>('domains') || [ ];
        domains.push({ name: domain, date: Date.now() });
        this.userStorageService.set('domains', domains);

        return connection;
    }

    public get = {
        it: (domain: string) => {
            return this.domains[domain];
        },
        connected: () => {
            return Object.keys(this.domains);
        },
        all: () => {
            return this.userStorageService.get<IDomainStored[]>('domains') || [];
        }
    }

    public update(domain: string, connection: IConnection) {
        // Find signal
        let domainSignal = this.domains[domain];
        // Check that exists
        if (!domainSignal) {
            domainSignal = this.create(domain);
        }

        domainSignal.update((connections) => {
            const included = connections.map(({ id }) => id).includes(connection.id);

            if (!included) {
                connections.push(connection as IConnection);
            }

            return connections;
        });

    }

    public remove({ id }: IConnection) {
        // Get all signals
        const allDomains = Object.values(this.domains).map((domain) => (domain as WritableSignal<IConnection[]>));
        // Find in domain signals
        const domains = allDomains.filter((domain) => domain().map(({ id }) => id).includes(id));
        // Remove peer from each domain
        domains.forEach((domain) => {
            domain.update((connections) => {
                const index = connections.findIndex((connection) => connection.id === id);

                if (index !== -1) {
                    connections.splice(index, 1);
                }
                
                return connections;
            });
        });
    }
}
