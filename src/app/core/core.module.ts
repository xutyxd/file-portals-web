import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutCoreComponent } from './components/layout-core/layout-core.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';


@NgModule({
  declarations: [
    LayoutCoreComponent,
    LayoutFooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
