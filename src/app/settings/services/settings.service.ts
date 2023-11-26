import { Injectable, signal } from '@angular/core';
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

    public can = signal<{ install: boolean, update: boolean }>({ install: false, update: false });

    constructor(private readonly swUptade: SwUpdate,
                private dialogService: DialogService,
                private appStorageService: AppStorageService) {
        console.log('Settings constructor...');
        this.darkMode = this.dark;
        this.checkVersion();

        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.installEvent = event;

            this.can.update((value) => {
                value.install = true;
                return value;
            });
        });

        window.addEventListener("appinstalled", () =>{
            this.can.update((value) => {
                value.install = false;
                return value;
            });
        });
        
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

    private async checkVersion() {

        await this.app.check();

        this.swUptade.versionUpdates.subscribe(async (event) => {
            if (event.type === 'NO_NEW_VERSION_DETECTED') {
                return;
            }

            const { updateable: denied } = this.settings;
            if (denied === false) {
                return;
            }

            const update = await this.dialogService.alert('There is a new version', 'Accept to update to new version', true);

            if (update) {
                this.app.update();
                return;
            }

            this.update('updateable', update);
        });
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
        check: async () => {
            let updateable = false;
            try {
                updateable = await this.swUptade.checkForUpdate();
    
                this.can.update((value) => {
                    value.update = updateable;
                    return value;
                });
            } catch {
                console.warn('Error checking for update...');
            }

            return updateable;
        },
        install: async () => {
            const { install } = this.can();
            if (!install || !this.installEvent) {
                return;
            }

            await this.installEvent.prompt();
        },
        update: () => {
            window.location.reload();
        }
    }
}
