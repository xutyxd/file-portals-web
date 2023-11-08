import { Injectable } from '@angular/core';
import { AppStorageService } from './app-storage.service';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
    private Nickname: string;
    private User?: IUser;

    public get nickname(): string {
        return this.Nickname;
    }

    public set nickname(nickname: string) {
        // Set nickname
        this.Nickname = nickname;
        // Get data of user
        const user = this.localStorageService.get<IUser>('user', nickname);
        // Set the data of user if its saved
        if (!user) {
            return;
        }
        // Set user
        this.user = user;
    }

    public get user(): any {
        return this.User;
    }

    public set user(user: any) {
        this.User = user;
        // this.set('user', user);
    }

    constructor(private localStorageService: LocalStorageService,
                appStorageService: AppStorageService) {
        this.Nickname = appStorageService.get('lastUser');

        if (!this.Nickname) {
            this.Nickname = crypto.randomUUID();
            appStorageService.set('lastUser', this.Nickname);
            const users = appStorageService.get<string[]>('users') || [];
            appStorageService.set('users', users.concat(this.Nickname));
        }
    }

    public get<T>(name: string): T{
        return this.localStorageService.get(name, this.nickname);
    }

    public set(name: string, data: any): void {
        return this.localStorageService.set(name, data, this.nickname);
    }

    public remove = (name: string) => {
        return this.localStorageService.remove(name, this.nickname);
    }
}
