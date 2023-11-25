import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';

@Component({
  selector: 'app-dialog-boolean',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    DialogHeaderComponent
  ],
  templateUrl: './dialog-boolean.component.html',
  styleUrl: './dialog-boolean.component.scss'
})
export class DialogBooleanComponent {
    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<DialogBooleanComponent>,
                @Inject(MAT_DIALOG_DATA) data: { title: string, message: string }) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit(): void { }

    public accept(): void {
        this.close(true);
    }

    public close(accept: boolean = false): void {
        this.dialogRef.close(accept);
    }
}
