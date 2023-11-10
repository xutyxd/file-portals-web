import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogAlertComponent } from './components/dialog/dialog-alert/dialog-alert.component';
import { DialogBooleanComponent } from './components/dialog/dialog-boolean/dialog-boolean.component';
import { DialogHeaderComponent } from './components/dialog/dialog-header/dialog-header.component';
import { DialogPromptComponent } from './components/dialog/dialog-prompt/dialog-prompt.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogAlertComponent,
    DialogBooleanComponent,
    DialogHeaderComponent,
    DialogPromptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
