import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-prompt',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    DialogHeaderComponent
  ],
  templateUrl: './dialog-prompt.component.html',
  styleUrl: './dialog-prompt.component.scss'
})
export class DialogPromptComponent {
    public title: string;

    public promptForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<DialogPromptComponent>,
                @Inject(MAT_DIALOG_DATA) data: { title: string, value: string }) {
        this.title = data.title;

        this.promptForm = new FormGroup({
            prompt: new FormControl(data.value, [ Validators.required, Validators.minLength(3) ])
        });
    }

    public accept() {
        const { prompt } = this.promptForm.getRawValue();

        this.close(prompt || false);
    }

    public close(value: string | boolean = false) {
        this.dialogRef.close(value);
    }
}
