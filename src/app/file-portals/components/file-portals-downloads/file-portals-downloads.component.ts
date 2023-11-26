import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FpTitleComponent } from '../../../ui/components/molecules/fp-title/fp-title.component';

import { FilePortalsDownloadsStatsComponent } from "../file-portals-downloads-stats/file-portals-downloads-stats.component";

@Component({
    selector: 'app-file-portals-downloads',
    standalone: true,
    templateUrl: './file-portals-downloads.component.html',
    styleUrl: './file-portals-downloads.component.scss',
    imports: [
        RouterLink,
        MatIconModule,
        FpTitleComponent,
        FilePortalsDownloadsStatsComponent
    ]
})
export class FilePortalsDownloadsComponent {

}

