import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
    @Input() text!: string;
    @Input() ref!: MatDialogRef<any>;

    constructor() { }

    public close(): void {
        this.ref.close();
    }
}
