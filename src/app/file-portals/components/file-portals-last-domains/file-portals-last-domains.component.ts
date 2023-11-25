import { Component } from '@angular/core';

import { DomainsService } from '../../services/domain.service';
import { IDomainStored } from '../../types/domain-stored.type';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FpTitleComponent } from 'src/app/ui/components/molecules/fp-title/fp-title.component';
import { FilePortalsService } from '../../services/file-portals.service';

@Component({
  selector: 'app-file-portals-last-domains',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FpTitleComponent
  ],
  templateUrl: './file-portals-last-domains.component.html',
  styleUrl: './file-portals-last-domains.component.scss',  
})
export class FilePortalsLastDomainsComponent {

    public domains: IDomainStored[] = [];

    constructor(private router: Router,
                domainsService: DomainsService,
                private filePortalsService: FilePortalsService) {
        this.domains = domainsService.get.all();
    }

    public open(domain?: string) {
        this.filePortalsService.open(domain);
    }
}
