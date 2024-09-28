import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherData } from '../../models/weather';
import { ToastrService } from 'ngx-toastr';
import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AngularSvgIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  weatherData!: WeatherData;
  lat: number = 0;
  lon: number = 0;
  city: string = '';
  errorMessage: string = '';
  useCurrentLocation: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentLocation(); // pega a localizacao inicial
    setInterval(() => {
      this.updateWeather(); // atualiza o clima a cada 15s 15000
    }, 15000);
  }

  // adicionar a cidade atual aos favoritos
  addToFavorites(): void {
    const favoriteCity = {
      name: this.weatherData.name,
      temp: this.weatherData.main.temp,
      humidity: this.weatherData.main.humidity,
      wind: this.weatherData.wind.speed,
      description: this.weatherData.weather[0].description,
    };

    // armazena no servico
    this.favoritesService.addFavorite(favoriteCity);

    this.toastr.success(
      `${favoriteCity.name} foi adicionado(a) aos favoritos!`
    );
  }

  // metodo para pegar a localizacao atual do navegador
  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.useCurrentLocation = true; // indica que estamos usando a localizacao atual
          this.loadWeather(); // chama a funcao para carregar o clima apos pegar a localizacao
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    } else {
      console.log('Geolocalização não está disponível no navegador.');
    }
  }

  // metodo para carregar o clima por coordenadas chamda api
  loadWeather(): void {
    this.weatherService.getWeather(this.lat, this.lon).subscribe(
      (data) => {
        /* console.log(data); */
        this.weatherData = data;
      },
      (error) => {
        console.log('Erro ao obter os dados de clima:', error);
      }
    );
  }

  // metodo que vai trazer o clima da cidade digitada
  loadWeatherByCity(): void {
    if (this.city.trim() !== '') {
      this.weatherService.getWeatherByCity(this.city).subscribe(
        (data) => {
          /* console.log(data); */
          this.weatherData = data;
          this.useCurrentLocation = false; // indica que estamos usando a cidade pesquisada
          this.errorMessage = '';
        },
        (error) => {
          console.error('Erro ao obter os dados de clima pela cidade:', error);
          this.errorMessage = 'Cidade não encontrada.';
          console.log(this.errorMessage);
        }
      );
    }
  }

  // funcaoo para atualizar os dados de clima a cada 15 segundos
  updateWeather(): void {
    if (this.useCurrentLocation) {
      this.loadWeather(); // atualiza com base na localizacao atual
    } else {
      this.loadWeatherByCity(); // atualiza com base na cidade pesquisada
    }
  }

  // dispara a funcao loadWeatherByCity ao submeter a pesquisa
  onSearch(): void {
    this.loadWeatherByCity();
  }
}
