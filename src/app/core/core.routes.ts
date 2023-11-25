import { Routes } from "@angular/router";
import { LayoutCoreComponent } from "./components/layout-core/layout-core.component";
import { configuredGuard } from "./guards/configured.guard";
import { MaterialIconService } from "../material/services/material-icon.service";
import { SettingsService } from "../settings/services/settings.service";
import { DomainsService } from "../file-portals/services/domain.service";
import { FileSystemService } from "../file-portals/services/file-system.service";
import { FilePortalsService } from "../file-portals/services/file-portals.service";

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: LayoutCoreComponent,
        canActivate: [ configuredGuard ],
        children: [
            { path: '', loadChildren: () => import('../file-portals/file-portals.routes').then(r => r.FILE_PORTALS_ROUTES) },
            { path: 'settings', loadChildren: () => import('../settings/settings.routes').then(r => r.SETTINGS_ROUTES) }
        ],
        providers: [
            DomainsService,
            FilePortalsService,
            FileSystemService,
            SettingsService,
            MaterialIconService
        ]
    }
]