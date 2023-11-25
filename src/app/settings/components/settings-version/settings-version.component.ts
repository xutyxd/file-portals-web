import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-version',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './settings-version.component.html',
  styleUrl: './settings-version.component.scss'
})
export class SettingsVersionComponent {

    public can;
    public version = '0.0.0';
    public disabled = signal({ check: false, install: false, update: false });

    constructor(private settingsService: SettingsService) {
        this.can = settingsService.can;
        this.version = settingsService.version;
    }

    private async disable(prop: 'check' | 'install' | 'update', disabled: boolean): Promise<void> {
        this.disabled.update((value) => {
            value[prop] = disabled;
            return value;
        });

        if (disabled) {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }

    public async check() {
        const disabling = this.disable('check', true);
        await this.settingsService.app.check();
        await disabling;

        this.disable('check', false);
    }

    public async install() {
        const disabling = this.disable('install', true);
        await this.settingsService.app.install();
        await disabling;

        this.disable('install', false);
    }

    public async update() {
        const disabling = this.disable('update', true);
        this.settingsService.app.update();
        await disabling;

        this.disable('update', false);
    }
}
