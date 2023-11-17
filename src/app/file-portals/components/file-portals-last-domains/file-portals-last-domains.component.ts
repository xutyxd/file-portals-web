import { Component } from '@angular/core';

import { DomainsService } from '../../services/domain.service';
import { IDomainStored } from '../../types/domain-stored.type';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-portals-last-domains',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './file-portals-last-domains.component.html',
  styleUrl: './file-portals-last-domains.component.scss',  
})
export class FilePortalsLastDomainsComponent {

    public domains: IDomainStored[] = [];

    constructor(private router: Router,
                domainsService: DomainsService) {
        this.domains = domainsService.get.all();
    }

    public open(domain: string) {
        this.router.navigateByUrl(`/portal/${domain}`);
    }
}
