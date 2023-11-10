import { Component } from '@angular/core';
import { UserStorageService } from 'src/app/shared/providers/user-storage.service';

@Component({
  selector: 'app-file-portals-last-domains',
  templateUrl: './file-portals-last-domains.component.html',
  styleUrl: './file-portals-last-domains.component.scss'
})
export class FilePortalsLastDomainsComponent {

    public domains: string[] = [];

    constructor(private userStorageService: UserStorageService) {
        this.domains = userStorageService.get('lastDomains') || [];
    }
}
