import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrl: './dialog-alert.component.scss'
})
export class DialogAlertComponent {
    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<DialogAlertComponent>,
                @Inject(MAT_DIALOG_DATA) data: { title: string, message: string }) {
        this.title = data.title;
        this.message = data.message;
    }

    public accept(): void {
        this.close(true);
    }

    public close(accept: boolean = false): void {
        this.dialogRef.close(accept);
    }
}
