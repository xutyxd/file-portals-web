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
    private domains = signal<{ [ domain: string ]: WritableSignal<IConnection[]> }>({ });
    
    constructor(private userStorageService: UserStorageService) {
        const domains = userStorageService.get<IDomainStored[]>('domains') || [];
        domains.forEach(({ name }) => {
            this.domains.update((value) => {
                value[name] = signal([ ]);

                return value;
            }
        )});
    }

    public create(domain: string) {
        const connection = signal<IConnection[]>([ ]);

        this.domains.update((value) => {
            value[domain] = connection;

            return value;
        });

        const domains = this.userStorageService.get<IDomainStored[]>('domains') || [ ];
        domains.push({ name: domain, date: Date.now() });
        this.userStorageService.set('domains', domains);

        return connection;
    }

    public get = {
        it: (domain: string) => {
            return this.domains()[domain];
        },
        connected: () => {
            return Object.keys(this.domains());
        },
        all: () => {
            return this.userStorageService.get<IDomainStored[]>('domains') || [];
        }
    }

    public remove(domain: string) {
        this.domains.update((value) => {
            delete value[domain];

            return value;
        });
    }
}
