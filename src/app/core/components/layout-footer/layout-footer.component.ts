import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilePortalsService } from 'src/app/file-portals/services/file-portals.service';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent {

    public links = [ 'home', 'settings' ];
    public activeLink = this.links[0];

    constructor(private router: Router,
                private filePortalsService: FilePortalsService) { }

    public navigate(where: 'home' | `portal/${string}` | 'settings') {
        this.router.navigateByUrl(`${where}`);
    }

    public open() {
        this.filePortalsService.open();
    }
}
