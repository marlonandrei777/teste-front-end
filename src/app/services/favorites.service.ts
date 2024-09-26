import { Injectable } from '@angular/core';
import { FavoriteCity } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: FavoriteCity[] = [];

  // carrega os favoritos do localstorage quando o servico e iniciado
  constructor() {
    this.loadFavorites();
  }

  // carregar os favoritos do localstorage
  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  // adiciona uma cidade aos favoritos
  addFavorite(city: FavoriteCity): void {
    this.favorites.push(city);
    this.saveFavorites();
  }

  // retorna a lista de cidades favoritas
  getFavorites(): FavoriteCity[] {
    return this.favorites;
  }

  // salvar os favoritos no localstorage
  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // remover uma cidade dos favoritos
  removeFavorite(index: number): void {
    this.favorites.splice(index, 1);
    this.saveFavorites();
  }
}
