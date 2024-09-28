import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteCity } from '../../models/weather';
import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'app-favorite-item',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './favorite-item.component.html',
  styleUrl: './favorite-item.component.scss',
})
export class FavoriteItemComponent {
  @Input() favorite!: FavoriteCity; // recebe os dados da cidade favorita
  @Input() index?: number; // indice pra saber qual cidade remover
  @Output() remove = new EventEmitter<number>(); // evento pra remover favorito

  // emitir o evento de remocaoo
  onRemove(): void {
    this.remove.emit(this.index);
  }
}
