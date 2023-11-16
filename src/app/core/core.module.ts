import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutCoreComponent } from './components/layout-core/layout-core.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsService } from '../settings/services/settings.service';


@NgModule({
  declarations: [
    LayoutCoreComponent,
    LayoutFooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    SettingsService
  ]
})
export class CoreModule {
    constructor(settingsService: SettingsService) {
        console.info('Current version: ', settingsService.version);
    }
}
