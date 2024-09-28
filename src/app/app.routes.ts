import { Routes } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Favoritos',
  },
];
