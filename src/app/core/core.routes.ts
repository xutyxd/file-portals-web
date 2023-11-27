import { Routes } from "@angular/router";
// Components
import { LayoutCoreComponent } from "./components/layout-core/layout-core.component";
// Guards
import { configuredGuard } from "./guards/configured.guard";

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: LayoutCoreComponent,
        canActivate: [ configuredGuard ],
        children: [
            { path: '', loadChildren: () => import('../file-portals/file-portals.routes').then(r => r.FILE_PORTALS_ROUTES) },
            { path: 'settings', loadChildren: () => import('../settings/settings.routes').then(r => r.SETTINGS_ROUTES) }
        ]
    }
]