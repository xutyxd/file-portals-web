import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FilePortal, FilePeer } from 'file-portals';
import { FilePortalsService } from '../../services/file-portals.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilePortalsPortalComponent } from '../file-portals-portal/file-portals-portal.component';

@Component({
  selector: 'app-file-portals-domain',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FilePortalsPortalComponent],
  templateUrl: './file-portals-domain.component.html',
  styleUrl: './file-portals-domain.component.scss'
})
export class FilePortalsDomainComponent {
    private domain?: string;
    public connection?: WritableSignal<{
        [socketId: string]: {
            portal: FilePortal;
            peer: FilePeer;
        };
    }>

    constructor(private activatedRoute: ActivatedRoute,
                private filePortalsService: FilePortalsService) {
        const { id } = this.activatedRoute.snapshot.params;
        this.domain = id;
    }

    public async ngOnInit(): Promise<void> {
        const start = Date.now();
        const { domain } = this;

        if (!domain) {
            return;
        }
        const end = Date.now();
        await new Promise((resolve) => setTimeout(resolve, 500 - (end - start)));

        this.connection = await this.filePortalsService.connect(domain);
        
        console.log('Connection: ', this.connection());
    }
}
