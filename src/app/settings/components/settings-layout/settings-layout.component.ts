import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SettingsVersionComponent } from '../settings-version/settings-version.component';

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    SettingsVersionComponent 
  ],
  templateUrl: './settings-layout.component.html',
  styleUrl: './settings-layout.component.scss'
})
export class SettingsLayoutComponent {

}
