import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from '../../components/favorites-list/favorites-list.component';
import { NoFavoritesComponent } from '../../components/no-favorites/no-favorites.component';
import { FavoriteCity } from '../../models/weather';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FavoritesListComponent, NoFavoritesComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteCity[] = [];

  // injetei o servico
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  // carregar os favoritos do servico
  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  // removendo via service
  removeFavorite(index: number): void {
    this.favoritesService.removeFavorite(index);
    this.loadFavorites();
  }
}
