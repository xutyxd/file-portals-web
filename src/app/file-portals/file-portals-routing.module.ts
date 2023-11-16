import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePortalsLayoutComponent } from './components/file-portals-layout/file-portals-layout.component';
import { FilePortalsDomainComponent } from './components/file-portals-domain/file-portals-domain.component';

const routes: Routes = [
    {
        path: '', component: FilePortalsLayoutComponent, children: [
            { path: 'portal/:id', component: FilePortalsDomainComponent },
        ]
    },
    { path: 'home', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
