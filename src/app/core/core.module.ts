import { NgModule, isDevMode } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    FormsModule,
    CoreRoutingModule,
    MaterialModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
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
