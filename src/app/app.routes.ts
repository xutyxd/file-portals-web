import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./core/core.routes').then(r => r.CORE_ROUTES) }
];
