import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCoreComponent } from './components/layout-core/layout-core.component';

const routes: Routes = [
    {
        path: '', component: LayoutCoreComponent, children: [
            { path: '', loadChildren: () => import('../files/files.module').then(m => m.FilesModule) },
            { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
