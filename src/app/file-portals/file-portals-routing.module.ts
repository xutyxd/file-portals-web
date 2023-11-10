import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePortalsConnectComponent } from './components/file-portals-connect/file-portals-connect.component';
import { FilePortalsLayoutComponent } from './components/file-portals-layout/file-portals-layout.component';
import { FilePortalsPortalComponent } from './components/file-portals-portal/file-portals-portal.component';

const routes: Routes = [
    {
        path: '', component: FilePortalsLayoutComponent, children: [
            { path: 'portal/:id', component: FilePortalsPortalComponent },
        ]
    },
    { path: 'home', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
