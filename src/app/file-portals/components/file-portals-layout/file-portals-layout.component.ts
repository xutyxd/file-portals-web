import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';

@Component({
  selector: 'app-file-portals-layout',
  templateUrl: './file-portals-layout.component.html',
  styleUrl: './file-portals-layout.component.scss'
})
export class FilePortalsLayoutComponent implements OnInit {

    private paths = ['/portal'];
    public navigated = false;

    constructor(private router: Router) {
        this.navigated = this.paths.includes(router.url);
    }

    public ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event.type !== EventType.NavigationEnd) {
                return;
            }

            this.navigated = this.paths.includes(event.urlAfterRedirects);
        });
    }
}
