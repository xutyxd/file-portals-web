import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { FilePortalsService } from '../../services/file-portals.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilePortalsPortalComponent } from '../file-portals-portal/file-portals-portal.component';
import { IConnection } from '../../types/connection.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-portals-domain',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FilePortalsPortalComponent
  ],
  templateUrl: './file-portals-domain.component.html',
  styleUrl: './file-portals-domain.component.scss'
})
export class FilePortalsDomainComponent implements OnDestroy {
    public domain!: string;
    public connection?: WritableSignal<IConnection[]>

    constructor(activatedRoute: ActivatedRoute,
                private filePortalsService: FilePortalsService) {
        activatedRoute.params.subscribe((params) => {
            const { id } = params;
            this.configure(id);
        });
    }

    private async configure(domain: string) {
        const start = Date.now();

        if (!domain) {
            return;
        }
        this.connection = undefined;
        // Save as title
        this.domain = domain;

        const end = Date.now();
        await new Promise((resolve) => setTimeout(resolve, 500 - (end - start)));

        this.connection = await this.filePortalsService.connect(domain);
    }

    public ngOnDestroy(): void {
        // Stop listening for domain
        this.filePortalsService.close(this.domain as string);
    }
}
