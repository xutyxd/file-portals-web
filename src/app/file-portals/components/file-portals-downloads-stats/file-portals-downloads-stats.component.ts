import { Component, WritableSignal, signal } from '@angular/core';
import { FpTitleComponent } from "../../../ui/components/molecules/fp-title/fp-title.component";
import { ITransfer } from '../../interfaces/transfer.interface';
import { UserStorageService } from '../../../shared/providers/user-storage.service';
import { FileSystemService } from '../../services/file-system.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { BytesPipe } from "../../../shared/pipes/bytes.pipe";

@Component({
    selector: 'app-file-portals-downloads-stats',
    standalone: true,
    templateUrl: './file-portals-downloads-stats.component.html',
    styleUrl: './file-portals-downloads-stats.component.scss',
    imports: [
        FpTitleComponent,
        MatDividerModule,
        MatRippleModule,
        BytesPipe
    ]
})
export class FilePortalsDownloadsStatsComponent {
    public downloads: WritableSignal<ITransfer[]>;

    constructor(userStorageService: UserStorageService,
                fileSystemService: FileSystemService) {
        const downloads = userStorageService.get<ITransfer[]>('downloads') || [];

        this.downloads = signal<ITransfer[]>((downloads as ITransfer[]).sort((a, b) => b.started - a.started));

        fileSystemService.on.download.subscribe((download) => {
            this.downloads.update((downloads) => [...downloads, download].sort((a, b) => b.started - a.started));
        });
    }

    public size(transfers: ITransfer[]) {
        return transfers.reduce((total, { size }) => total += size, 0);
    }
}
