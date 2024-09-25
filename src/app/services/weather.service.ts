import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6daffccfd10982c85238aaeeeb0885f0';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?lat=${lat}&lon=${lon}&lang=pt_br&appid=${this.apiKey}&units=metric`
    );
  }
}
