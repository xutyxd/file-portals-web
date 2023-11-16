import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './file-portals-routing.module';
// Components
import { FilePortalsLayoutComponent } from './components/file-portals-layout/file-portals-layout.component';
import { FilePortalsLastDomainsComponent } from './components/file-portals-last-domains/file-portals-last-domains.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    FilePortalsLayoutComponent,
    FilePortalsLastDomainsComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    MaterialModule
  ]
})
export class FilesModule { }
