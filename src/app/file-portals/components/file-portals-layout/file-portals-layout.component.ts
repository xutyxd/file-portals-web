import { Component, OnInit } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import { FilePortalsLastDomainsComponent } from '../file-portals-last-domains/file-portals-last-domains.component';
import { FilePortalsDownloadsComponent } from '../file-portals-downloads/file-portals-downloads.component';

@Component({
  selector: 'app-file-portals-layout',
  standalone: true,
  imports: [
    RouterModule,
    FilePortalsLastDomainsComponent,
    FilePortalsDownloadsComponent
  ],
  templateUrl: './file-portals-layout.component.html',
  styleUrl: './file-portals-layout.component.scss'
})
export class FilePortalsLayoutComponent implements OnInit {

    private paths = ['/portal'];
    public navigated = false;

    constructor(private router: Router) {
        this.navigated = this.check(router.url);
    }
    private check(url: string) {
        return this.paths.some((path) => url.includes(path));
    }

    public ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event.type !== EventType.NavigationEnd) {
                return;
            }

            this.navigated = this.check(event.urlAfterRedirects);
        });
    }
}
