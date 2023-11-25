import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../shared/services/dialog.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent {

    public links = [ 'home', 'settings' ];
    public activeLink = this.links[0];

    constructor(private router: Router,
                private dialogService: DialogService) { }

    public navigate(where: 'home' | `portal/${string}` | 'settings') {
        this.router.navigateByUrl(`${where}`);
    }

    public async open() {
        const portal = await this.dialogService.prompt('Where do you want to connect?');

        if (!portal) {
            return;
        }
        
        this.navigate(`portal/${portal}`);
    }
}
