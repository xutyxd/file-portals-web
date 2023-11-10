import { ChangeDetectionStrategy, Component, DestroyRef, Input, NgZone, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FilePortal } from 'file-portals';
import { DialogService } from '../../../shared/services/dialog.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-file-portals-portal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './file-portals-portal.component.html',
  styleUrl: './file-portals-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePortalsPortalComponent implements OnInit {

    destroyRef = inject(DestroyRef);
    
    @Input() portal!: FilePortal;

    constructor(private ngZone: NgZone,
                private dialogService: DialogService) { }

    public async ngOnInit(): Promise<void> {
        const destroyed = new Subject<void>();
 
        this.destroyRef.onDestroy(() => {
            destroyed.next();
            destroyed.complete();
        });

        this.portal.on.files.pipe(takeUntil(destroyed)).subscribe(({ resolve, reject }) => {
            this.ngZone.run(async () => {
                const title = 'Files requested';
                const message = `User ${ this.portal.destination.name } has requested your files. Do you want to share them?`;
                const response = await this.dialogService.alert(title, message, true);

                const action = response ? resolve : reject;

                action();
              });
        });

        // setTimeout(async () => {
        //     const title = 'Files requested';
        //     const message = `User ${ this.portal.destination.name } has requested your files. Do you want to share them?`;
        //     const response = await this.dialogService.alert(title, message, true);
        //     console.log('Response: ', response);
        // }, 5000);
    }

    public async files() {
        try {
            const files = await this.portal.files();
            console.log('Files: ', files);
        } catch(e) {
            const message = `User ${ this.portal.destination.name } denied to share files`;
            this.dialogService.alert('Error', message);
        }
    }

    public async close() {
        await this.portal.shutdown();
    }
}

