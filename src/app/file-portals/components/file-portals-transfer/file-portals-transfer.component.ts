import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ITransfer } from 'src/app/file-portals/interfaces/transfer.interface';
import { MatIconModule } from '@angular/material/icon';
import { BytesPipe } from "../../../shared/pipes/bytes.pipe";

@Component({
    selector: 'app-file-portals-transfer',
    standalone: true,
    templateUrl: './file-portals-transfer.component.html',
    styleUrl: './file-portals-transfer.component.scss',
    imports: [
        CommonModule,
        MatIconModule,
        MatProgressBarModule,
        BytesPipe
    ]
})
export class FilePortalsTransferComponent {

    @Input() transfer!: ITransfer;

    public get time() {
        return (this.transfer.ended || Date.now()) - this.transfer.started;
    }

    public get percent() {
        return Math.round((this.transfer.transferred / this.transfer.size) * 100);
    }
}
