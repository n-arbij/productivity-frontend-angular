import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PublicLayout } from './layout/public-layout/public-layout';
import { guestGuard } from './core/guards/guest.guard';
import { AuthenticatedLayout } from './layout/authenticated-layout/authenticated-layout';
import { LoginComponent } from './feature/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayout,
        canActivate: [guestGuard],
        children: [
            {
                path: '',
                loadComponent: () => 
                    import('./feature/auth/login/login.component')
                        .then(c => c.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./feature/auth/register/register.component')
                        .then(c => c.RegisterComponent)
            }
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
