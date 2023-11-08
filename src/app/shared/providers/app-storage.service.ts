import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

    private app = 'ce';

    constructor(private localStorageService: LocalStorageService) { }

    public get<T>(name: string): T{
        return this.localStorageService.get(name, this.app);
    }

    public set(name: string, data: any): void {
        return this.localStorageService.set(name, data, this.app);
    }

    public remove = (name: string) => {
        return this.localStorageService.remove(name, this.app);
    }
}
