import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'app-no-favorites',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './no-favorites.component.html',
  styleUrl: './no-favorites.component.scss',
})
export class NoFavoritesComponent {}
