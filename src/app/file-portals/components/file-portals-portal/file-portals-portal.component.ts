import { Component, DestroyRef, Input, NgZone, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { FilePortal } from 'file-portals';
import { DialogService } from '../../../shared/services/dialog.service';
import { Subject, takeUntil } from 'rxjs';
import { FilePortalsFilesComponent } from '../file-portals-files/file-portals-files.component';
import { IFile } from '../../types/file.type';

@Component({
  selector: 'app-file-portals-portal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FilePortalsFilesComponent],
  templateUrl: './file-portals-portal.component.html',
  styleUrl: './file-portals-portal.component.scss'
})
export class FilePortalsPortalComponent implements OnInit {

    destroyRef = inject(DestroyRef);
    
    @Input() portal!: FilePortal;

    public peer = signal<FilePortal['destination']>({ name: 'peer', type: 'client' });

    public files = signal<IFile[]>([]);

    constructor(private ngZone: NgZone,
                private dialogService: DialogService) { }

    public async ngOnInit(): Promise<void> {
        const destroyed = new Subject<void>();
 
        this.destroyRef.onDestroy(() => {
            destroyed.next();
            destroyed.complete();
        });
        console.log('Portal: ', this.portal);
        const information = await this.portal.information();
        console.log('Information of portal: ', information);
        this.peer.set(information);

        this.portal.on.files.pipe(takeUntil(destroyed)).subscribe(({ resolve, reject }) => {
            this.ngZone.run(async () => {
                const title = 'Files requested';
                const message = `User ${ this.portal.destination.name } has requested your files. Do you want to share them?`;
                const response = await this.dialogService.alert(title, message, true);

                const action = response ? resolve : reject;

                action();
              });
        });
    }

    public actions = {
        files: async () => {
            try {
                this.ngZone.run(async () => {
                    const files = await this.portal.files();
                    console.log('Files: ', files);
                    this.files.update((value) => {
                        const uuids = value.map(({ uuid }) => uuid);

                        const news = files.filter(({ uuid }) => !uuids.includes(uuid));
                        news.forEach((file) => value.push(file));

                        return value;
                    });
                });
            } catch(e) {
                const message = `User ${ this.portal.destination.name } denied to share files`;
                this.dialogService.alert('Error', message);
            }
        },
        close: async () => {
            await this.portal.shutdown();
        }
    }
}

