import { Injectable } from '@angular/core';
import { AppStorageService } from './app-storage.service';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
    
    private uuid?: string;
    private User?: IUser;

    constructor(private localStorageService: LocalStorageService,
                private appStorageService: AppStorageService) {
        // Check if exist last user of app
        const uuid = appStorageService.get<string>('lastUser');

        if (!uuid) {
            return;
        }

        this.uuid = uuid;
        // Get user in that case
        this.User = localStorageService.get<IUser>('user', uuid);
    }

    public user = {
        create: (nickname: string) => {
            // Create an uuid
            const uuid = crypto.randomUUID();
            // Create user object
            const user: IUser = { uuid, nickname };
            // Set nickname to allow set user
            this.uuid = uuid;
            // Save user
            this.set('user', user);
            // Save on memory
            this.User = user;
            // Save to users
            const users = this.appStorageService.get<string[]>('users') || [];
            users.push(uuid);
            this.appStorageService.set('users', users);
            // Change user to last one
            this.user.change(uuid);
        },
        get: () => {
            return { ...this.User } as IUser;
        },
        logged: () => {
            return !!this.uuid;
        },
        change: (uuid: string) => {
            this.uuid = uuid;
            this.appStorageService.set('lastUser', uuid);
        }
    }

    public get<T>(name: string): T{
        if (!this.uuid) {
            throw new Error('User not logged');
        }

        return this.localStorageService.get(name, this.uuid);
    }

    public set(name: string, data: any): void {
        if (!this.uuid) {
            throw new Error('User not logged');
        }

        return this.localStorageService.set(name, data, this.uuid);
    }

    public remove = (name: string) => {
        if (!this.uuid) {
            throw new Error('User not logged');
        }

        return this.localStorageService.remove(name, this.uuid);
    }
}
