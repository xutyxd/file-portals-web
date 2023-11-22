import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStorageService } from 'src/app/shared/providers/user-storage.service';
import { FileSystemService } from '../../services/file-system.service';
import { ITransfer } from '../../interfaces/transfer.interface';
import { FilePortalsTransferComponent } from '../file-portals-transfer/file-portals-transfer.component';

@Component({
  selector: 'app-file-portals-downloads',
  standalone: true,
  imports: [
    CommonModule,
    FilePortalsTransferComponent
  ],
  templateUrl: './file-portals-downloads.component.html',
  styleUrl: './file-portals-downloads.component.scss'
})
export class FilePortalsDownloadsComponent {

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

