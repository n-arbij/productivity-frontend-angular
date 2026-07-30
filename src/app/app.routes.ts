import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PublicLayout } from './layout/public-layout/public-layout';
import { guestGuard } from './core/guards/guest.guard';
import { AuthenticatedLayout } from './layout/authenticated-layout/authenticated-layout';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayout,
        canActivate: [guestGuard],
        children: [

        ]
    },
    {
        path: 'app',
        component: AuthenticatedLayout,
        canActivate: [authGuard],
        children: [

        ]
    }
];
