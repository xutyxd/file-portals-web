import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutFooterComponent } from '../layout-footer/layout-footer.component';
import { MaterialIconService } from 'src/app/material/services/material-icon.service';

@Component({
  selector: 'app-layout-core',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutFooterComponent
  ],
  templateUrl: './layout-core.component.html',
  styleUrls: ['./layout-core.component.scss']
})
export class LayoutCoreComponent {
    constructor(materialIconService: MaterialIconService) { }
}
