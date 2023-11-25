import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MaterialIconService {

    constructor(iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('portal-color', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-color.svg'));
        iconRegistry.addSvgIcon('portal-lines', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-lines.svg'));
        iconRegistry.addSvgIcon('portal-lines-inverted', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-lines-inverted.svg'));
        iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home.svg'));
        console.log('All icons imported!');
    }
}
