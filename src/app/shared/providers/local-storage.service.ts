import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public get<T>(name: string, username: string): T{
        let result: any;

        try {
            const user = JSON.parse(localStorage.getItem(username) || '{}');
            result = name ? user[name] : user;
        } catch (e) { }

        return result;
    }

    public set(name: string, data: any, user: string): void {
        let previusData: any = localStorage.getItem(user) || '{}';

        try {
            previusData = JSON.parse(previusData);
        } catch (e) {
            previusData = {};
        }
        // Set data of user
        previusData[name] = data;
        // Parse and save
        localStorage.setItem(user, JSON.stringify(previusData));
    }

    public remove = (name: string, user: string) => {

        // Get data of user
        let data: any = localStorage.getItem(user) || {};
        // Try to parse
        try {
            data = JSON.parse(data);
        } catch (e) { }
        // Delete data
        delete data[name];
        // Save on localStorage
        localStorage.setItem(user, JSON.stringify(data));
    }
}
