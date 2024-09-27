import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>; // adicionando o mock do ToastrService

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getWeatherByCity',
      'getWeatherByCoordinates',
    ]);
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'addFavorite',
    ]);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']); // mock do alerta success

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]), // substituicao RouterTestingModule por provideRouter
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(
          // Prover ToastrModule
          ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          })
        ),
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }, //  o mock do toastrService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tem que mostrar os dados do clima ao buscar a cidade', () => {
    const fakeWeatherData = {
      name: 'Belém',
      main: { temp: 22, humidity: 60 },
      wind: { speed: 4 },
      weather: [{ description: 'ensolarado' }],
    };

    weatherServiceSpy.getWeatherByCity.and.returnValue(of(fakeWeatherData));

    component.city = 'Belém';
    component.loadWeatherByCity();

    fixture.detectChanges();

    // alterar a fonte dps
    const cityName = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(cityName.textContent).toContain('Belém');
    expect(weatherServiceSpy.getWeatherByCity).toHaveBeenCalled();

    /* expect(component).toBeTruthy(); */
  });

  it('tem que adicionar a cidade aos favoritos', () => {
    const dummyWeatherData = {
      name: 'Belém',
      main: { temp: 22, humidity: 60 },
      wind: { speed: 4 },
      weather: [{ description: 'ensolarado' }],
    };

    const expectedFavoriteCity = {
      name: dummyWeatherData.name,
      temp: dummyWeatherData.main.temp,
      humidity: dummyWeatherData.main.humidity,
      wind: dummyWeatherData.wind.speed,
      description: dummyWeatherData.weather[0].description,
    };

    component.weatherData = dummyWeatherData;

    const addButton = fixture.debugElement.query(
      By.css('button:last-of-type')
    ).nativeElement;
    addButton.click();

    expect(favoritesServiceSpy.addFavorite).toHaveBeenCalledWith(
      expectedFavoriteCity
    );
  });
});
