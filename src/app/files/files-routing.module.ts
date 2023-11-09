import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePortalConnectComponent } from './components/file-portal-connect/file-portal-connect.component';
import { FilesLayoutComponent } from './components/files-layout/files-layout.component';

const routes: Routes = [
    {
        path: '', component: FilesLayoutComponent, children: [
            { path: 'portal', component: FilePortalConnectComponent },
        ]
    },
    { path: 'home', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
