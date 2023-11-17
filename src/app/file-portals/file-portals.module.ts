import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './file-portals-routing.module';
// Components
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    MaterialModule
  ]
})
export class FilesModule { }
