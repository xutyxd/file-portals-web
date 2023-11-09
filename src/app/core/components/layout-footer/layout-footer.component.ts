import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent {

    public links = [ 'home', 'settings' ];
    public activeLink = this.links[0];
    public background: ThemePalette = undefined;

    constructor(private router: Router) { }

    public navigate(where: 'home' | 'portal' | 'settings') {
        this.router.navigateByUrl(`${where}`);
    }
}
