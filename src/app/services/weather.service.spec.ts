import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting(), // nova forma de configurar o httppClient para testes, ele substitui o antigo HttpClientTestingModule
      ],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController); // verifica as chamadas e simula as respostas
  });

  // verifica se nao tem chamadas pendentes da api
  afterEach(() => {
    httpMock.verify();
  });

  it('tem que obter o clima por coordenada', () => {
    const fakeWeatherData = {
      name: 'Belém',
      main: { temp: 29, humidity: 60 },
      wind: { speed: 4 },
      weather: [{ description: 'ensolarado' }],
    };

    service.getWeather(22.90278, 43.2075).subscribe((data) => {
      expect(data.name).toBe('Belém');
      expect(data.main.temp).toBe(29);
    });

    // simula resposta da api
    const req = httpMock.expectOne((request) =>
      request.url.includes('lat=22.90278&lon=43.2075')
    );
    expect(req.request.method).toBe('GET');
    req.flush(fakeWeatherData);
  });

  it('tem que obter o clima por cidade', () => {
    const fakeWeatherData = {
      name: 'Manaus',
      main: { temp: 30, humidity: 70 },
      wind: { speed: 6 },
      weather: [{ description: 'nublado' }],
    };

    service.getWeatherByCity('Manaus').subscribe((data) => {
      expect(data.name).toBe('Manaus');
      expect(data.main.temp).toBe(30);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('q=Manaus')
    );
    expect(req.request.method).toBe('GET');
    req.flush(fakeWeatherData);
  });
});
