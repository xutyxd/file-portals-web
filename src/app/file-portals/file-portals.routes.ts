import { Routes } from "@angular/router";
import { FilePortalsDomainComponent } from "./components/file-portals-domain/file-portals-domain.component";
import { FilePortalsLayoutComponent } from "./components/file-portals-layout/file-portals-layout.component";


export const FILE_PORTALS_ROUTES: Routes = [
    {
        path: '', component: FilePortalsLayoutComponent, children: [
            { path: 'portal/:id', component: FilePortalsDomainComponent },
        ]
    },
    { path: 'home', redirectTo: '' }
]