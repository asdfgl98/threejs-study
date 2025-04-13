import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import HomePage from './pages/home/home.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'box',
        loadComponent: () => import('./pages/item/box/box.page'),
      },
      {
        path: 'line',
        loadComponent: () => import('./pages/item/line/line.page'),
      },
    ],
  },
];
