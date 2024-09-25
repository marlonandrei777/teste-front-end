import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  lat: number = 0;
  lon: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    /* this.loadWeather(); */
    this.getCurrentLocation();
    setInterval(() => {
      this.loadWeather();
    }, 15000);
  }

  // Método para pegar a localização atual do navegador
  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.loadWeather(); // Chama a função para carregar o clima após pegar a localização
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    } else {
      console.log('Geolocalização não está disponível no navegador.');
    }
  }

  loadWeather(): void {
    this.weatherService.getWeather(this.lat, this.lon).subscribe(
      (data) => {
        console.log(data);
        this.weatherData = data;
      },
      (error) => {
        console.log('Erro ao obter os dados de clima:', error);
      }
    );
  }
}
