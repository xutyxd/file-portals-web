import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrl: './dialog-prompt.component.scss'
})
export class DialogPromptComponent {
    public title: string;
    public value: string;

    constructor(public dialogRef: MatDialogRef<DialogPromptComponent>,
                @Inject(MAT_DIALOG_DATA) data: { title: string, value: string }) {
        this.title = data.title;
        this.value = data.value;
    }

    public accept() {
        this.close(this.value);
    }

    public close(value: string | boolean = false) {
        this.dialogRef.close(value);
    }
}
