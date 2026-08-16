import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './index.html'
})
export class Navbar {
  mobileOpen = signal(false);
 
  navLinks = [
    { path: '/home', label: 'home', exact: true },
    { path: '/about', label: 'about', exact: false },
    { path: '/projects', label: 'projects', exact: false },
    { path: '/newsletter', label: 'newsletter', exact: false },
    { path: '/contact', label: 'contact', exact: false },
  ];
}
