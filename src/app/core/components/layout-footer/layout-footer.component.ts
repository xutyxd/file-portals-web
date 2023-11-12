import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent {

    public links = [ 'home', 'settings' ];
    public activeLink = this.links[0];
    public background: ThemePalette = undefined;

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
