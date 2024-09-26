import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteItemComponent } from '../favorite-item/favorite-item.component';
import { FavoriteCity } from '../../models/weather';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, FavoriteItemComponent],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',
})
export class FavoritesListComponent {
  @Input() favorites: FavoriteCity[] = []; // recebe a lista de favoritos
  @Output() remove = new EventEmitter<number>(); // evento para remover favorito

  // emiti o evento de remocaoo para o componente pai
  onRemove(index: number): void {
    this.remove.emit(index);
  }
}
