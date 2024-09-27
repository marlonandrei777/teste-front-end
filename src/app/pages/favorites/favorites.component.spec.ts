import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../services/favorites.service';
import { By } from '@angular/platform-browser';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getFavorites',
      'removeFavorite',
    ]);

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesServiceSpy }], // mock do favorite
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    // simula a inicializacao com um array vazio pra evitar error
    favoritesServiceSpy.getFavorites.and.returnValue([]);
    component.loadFavorites(); // carrega as cidades favoritas

    fixture.detectChanges();
  });

  it('tem que carregar as cidades favoritas', () => {
    // simula as cidades favoritas
    const fakeFavorites = [
      {
        name: 'Belém',
        temp: 22,
        humidity: 60,
        wind: 4,
        description: 'ensolarado',
      },
      {
        name: 'Manaus',
        temp: 30,
        humidity: 70,
        wind: 6,
        description: 'nublado',
      },
    ];

    // mock pra retornar as cidades favoritas
    favoritesServiceSpy.getFavorites.and.returnValue(fakeFavorites);

    // atualiza a interface
    component.loadFavorites();
    fixture.detectChanges();

    // alterar antes de estilizar
    const favoriteCities = fixture.debugElement.queryAll(By.css('.card')); // verifica se os cards de cidades favoritas foram carregados
    expect(favoriteCities.length).toBe(2); // espera que 2 cidades sejam carregadas
    expect(favoriteCities[0].nativeElement.textContent).toContain('Belém');

    expect(component).toBeTruthy();
  });

  it('tem que remover uma cidade dos favoritos', () => {
    const fakeFavorites = [
      {
        name: 'Belém',
        temp: 22,
        humidity: 60,
        wind: 4,
        description: 'ensolarado',
      },
    ];

    // simula cidades favoritas
    favoritesServiceSpy.getFavorites.and.returnValue(fakeFavorites);

    // carrega as cidades favoritas
    component.loadFavorites();
    fixture.detectChanges();

    // simulando o clique do botao de remover
    const removeButton = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    removeButton.click();

    // espera que a funcao removeFavorite seja chamada com o indice correto
    expect(favoritesServiceSpy.removeFavorite).toHaveBeenCalledWith(0);
  });
});
