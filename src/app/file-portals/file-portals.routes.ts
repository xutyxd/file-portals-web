import { Routes } from "@angular/router";
import { FilePortalsDomainComponent } from "./components/file-portals-domain/file-portals-domain.component";
import { FilePortalsLayoutComponent } from "./components/file-portals-layout/file-portals-layout.component";
import { FilePortalsDownloadsListComponent } from "./components/file-portals-downloads-list/file-portals-downloads-list.component";


export const FILE_PORTALS_ROUTES: Routes = [
    {
        path: '', component: FilePortalsLayoutComponent, children: [
            { path: 'portal/:id', component: FilePortalsDomainComponent },
        ],
    },
    { path: 'downloads', component: FilePortalsDownloadsListComponent },
    { path: 'home', redirectTo: '' }
]