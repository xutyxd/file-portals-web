import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { environment } from '../../../environments/environment';

import { AppStorageService } from '../../shared/providers/app-storage.service';
import { DialogService } from '../../shared/services/dialog.service';
import { ISettings } from '../types/settings.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    private readonly property = 'settings';
    private darkMode: boolean;
    private installEvent?: WindowEventMap['beforeinstallprompt'];

    public can = {
        install: false,
        update: false
    }

    constructor(private readonly swUptade: SwUpdate,
                private dialogService: DialogService,
                private appStorageService: AppStorageService) {
        this.darkMode = this.dark;
        this.checkVersion();

        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.installEvent = event;
            this.can.install = true;
        });

        window.addEventListener("appinstalled", t=>{
            
        });

        console.log('Settings constructor...');
        
        this.update('version', environment.version);
    }

    private get settings() {
        const settings = this.appStorageService.get<ISettings>(this.property);
        return typeof settings === 'object' && settings || { dark: false, updateable: false, version: '0.0.0' };
    }

    private update(property: keyof ISettings, value: any) {
        const settings = this.settings;
        settings[property] = value;
        this.appStorageService.set(this.property, settings);
    }

    private checkVersion() {
        if (this.swUptade.versionUpdates) {
            this.swUptade.versionUpdates.subscribe(async () => {

                const { updateable: denied } = this.settings;
                if (denied === false) {
                    return;
                }

                const update = await this.dialogService.alert('There is a new version', 'Accept to update to new version', true);
                console.log('update:', update);
                if (update) {
                    window.location.reload();
                    return;
                }

                this.update('updateable', true);
            });
        }
    }

    public get updateable() {
        return this.settings.updateable;
    }

    public get version() {
        return this.settings.version as string;
    }

    public get dark() {

        let dark: boolean | undefined = this.darkMode;

        if (dark === undefined) {
            dark = this.settings.dark;
        }

        if(dark === undefined) {
            try {
                dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            } catch(e) { }
        }

        return dark || false;
    }

    public set dark(value: boolean) {
        this.update('dark', value);
    }

    public app = {
        install: async () => {
            if (!this.can.install || !this.installEvent) {
                return;
            }

            await this.installEvent.prompt();
        },
        update: () => {
            this.update('updateable', false);
            window.location.reload();
        }
    }
}
