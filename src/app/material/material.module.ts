import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
// import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
    constructor(iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('portal-color', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-color.svg'));
        iconRegistry.addSvgIcon('portal-lines', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-lines.svg'));
        iconRegistry.addSvgIcon('portal-lines-inverted', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/portal-lines-inverted.svg'));
        iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home.svg'));
    }
}
