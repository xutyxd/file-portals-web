import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogAlertComponent } from '../components/dialog/dialog-alert/dialog-alert.component';
import { DialogBooleanComponent } from '../components/dialog/dialog-boolean/dialog-boolean.component';
import { DialogPromptComponent } from '../components/dialog/dialog-prompt/dialog-prompt.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public async alert(title: string, message?: string, ask = false): Promise<boolean> {
        const component = ask ? DialogBooleanComponent : DialogAlertComponent;
        let result = await this.open(component, { data: { title, message }, closeOnNavigation: true, panelClass: [ 'tmotn' ],  });

        if (result === undefined) {
            result = false;
        }

        return result;
    }

    public prompt(title: string, value?: string, fullScreen?: boolean): Promise<string> {
        return this.open(DialogPromptComponent, { data: { title, value }, closeOnNavigation: true, panelClass: [ 'tmotn' ].concat( fullScreen ? 'full-screen-modal' : '' ) });
    }

    public fullScreen(component: ComponentType<any>, config: MatDialogConfig = {}) {
        return this.open(component, { ...config,  panelClass: [ 'full-screen-modal' ] });
    }

    public open(component: ComponentType<any>, config: MatDialogConfig) {
        return firstValueFrom(this.dialog.open(component, { ...config, autoFocus: false }).afterClosed());
    }
}
