import { Component, WritableSignal, signal } from '@angular/core';

import { UserStorageService } from '../../../shared/providers/user-storage.service';
import { ITransfer } from '../../interfaces/transfer.interface';
import { FileSystemService } from '../../services/file-system.service';
import { FpTitleComponent } from "../../../ui/components/molecules/fp-title/fp-title.component";
import { FilePortalsTransferComponent } from "../file-portals-transfer/file-portals-transfer.component";
import { FilePortalsDownloadsStatsComponent } from "../file-portals-downloads-stats/file-portals-downloads-stats.component";

@Component({
    selector: 'app-file-portals-downloads-list',
    standalone: true,
    templateUrl: './file-portals-downloads-list.component.html',
    styleUrl: './file-portals-downloads-list.component.scss',
    imports: [
        FpTitleComponent,
        FilePortalsTransferComponent,
        FilePortalsDownloadsStatsComponent
    ]
})
export class FilePortalsDownloadsListComponent {

    public downloads: WritableSignal<ITransfer[]>;

    constructor(userStorageService: UserStorageService,
                fileSystemService: FileSystemService) {
        const downloads = userStorageService.get<ITransfer[]>('downloads') || [];

        this.downloads = signal<ITransfer[]>((downloads as ITransfer[]).sort((a, b) => b.started - a.started));

        fileSystemService.on.download.subscribe((download) => {
            this.downloads.update((downloads) => [...downloads, download].sort((a, b) => b.started - a.started));
        });
    }
}
