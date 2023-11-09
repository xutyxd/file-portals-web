import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutCoreComponent } from './components/layout-core/layout-core.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LayoutCoreComponent,
    LayoutFooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ]
})
export class CoreModule { }
