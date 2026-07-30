import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NavbarItem } from '../../core/models/nav-item.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

export const NAVBAR_ITEMS: NavbarItem[] = [
    {
        label: 'Dashboard',
        route: '/app/dashboard'
    },
    {
        label: 'Events',
        route: '/app/events'
    },
    {
        label: 'Habits',
        route: '/app/habits'
    },
    {
        label: 'Journals',
        route: '/app/journals'
    },
    {
        label: 'Timer',
        route: '/app/time'
    },
    {
        label: 'Settings',
        route: '/app/settings'
    }
]

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly navbarItems = NAVBAR_ITEMS;
  private authService = inject(AuthService);

  logout(): void {
      this.authService.logout();
  }
}
