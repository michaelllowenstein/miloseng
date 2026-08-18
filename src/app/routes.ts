import { Routes } from '@angular/router';
import { routeAnimationIndex } from '@schema/utils/route-order';

export const ROUTE_ORDER = [
  'HomePage', 'AboutMePage', 'ProjectsPage', 'ProjectPage',
  'NewsletterPage', 'ContactMePage'
];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('@components/page/home').then(m => m.HomePage),
    data: { animation: routeAnimationIndex('home') },
    title: 'Home'
  },
  {
    path: 'about',
    loadComponent: () => import('@components/page/about').then(m => m.AboutMePage),
    data: { animation: routeAnimationIndex('about') },
    title: 'About Me'
  },
  {
    path: 'projects',
    loadComponent: () => import('@components/page/projects').then(m => m.ProjectsPage),
    data: { animation: routeAnimationIndex('projects') },
    title: 'Projects'
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('@feature/project').then(m => m.ProjectComponent),
  },
  {
    path: 'newsletter',
    loadComponent: () => import('@components/page/newsletter').then(m => m.NewsletterPage),
    data: { animation: routeAnimationIndex('newsletter') },
    title: 'Newsletter'
  },
  {
    path: 'contact',
    loadComponent: () => import('@components/page/contact').then(m => m.ContactMePage),
    data: { animation: routeAnimationIndex('contact') },
    title: 'Contact Me'
  }
];