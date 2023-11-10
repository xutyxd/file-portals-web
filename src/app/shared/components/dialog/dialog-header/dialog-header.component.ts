import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
    @Input() text!: string;
    @Input() ref!: MatDialogRef<any>;

    constructor() { }

    ngOnInit(): void { }

    public close(): void {
        this.ref.close();
    }
}
