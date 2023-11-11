import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-version',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './settings-version.component.html',
  styleUrl: './settings-version.component.scss'
})
export class SettingsVersionComponent {

    public can;
    public version = '0.0.0';

    constructor(private settingsService: SettingsService) {
        this.can = settingsService.can;
        this.version = settingsService.version;
    }

    public install() {
        this.settingsService.app.install();
    }

    public update() {
        this.settingsService.app.update();
    }
}
