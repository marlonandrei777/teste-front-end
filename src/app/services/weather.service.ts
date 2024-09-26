import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6daffccfd10982c85238aaeeeb0885f0';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // método que pega o clima por coordenadas
  getWeather(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.apiUrl}?lat=${lat}&lon=${lon}&lang=pt_br&appid=${this.apiKey}&units=metric`
    );
  }

  // método que pega o clima por cidade
  getWeatherByCity(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}
