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
            {
                path: 'dashboard',
                loadComponent: () => 
                    import('./feature/dashboard/dashboard.component')
                        .then(c => c.DashboardComponent)
            },
            {
                path: 'events',
                loadComponent: () => 
                    import('./feature/event/event.component')
                        .then(c => c.EventComponent)
            },
            {
                path: 'habits',
                loadComponent: () => 
                    import('./feature/habit/habit-list/habit-list.component')
                        .then(c => c.HabitListComponent)
            },{
                path: 'journals',
                loadComponent: () => 
                    import('./feature/journal/journal.component')
                        .then(c => c.JournalComponent)
            },
            {
                path: 'time',
                loadComponent: () => 
                    import('./feature/time/time.component')
                        .then(c => c.TimeComponent)
            }

        ]
    }
];
