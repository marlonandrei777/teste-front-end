import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteItemComponent } from './favorite-item.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteItemComponent],
      providers: [provideHttpClient(), SvgIconRegistryService, SvgLoader],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;

    // simular o valor esperado
    component.favorite = {
      name: 'Belém',
      temp: 22,
      humidity: 60,
      wind: 4,
      description: 'ensolarado',
    };

    // aplicar as mudancas no componente
    fixture.detectChanges();
  });

  // verifica se o componente foi criado com sucesso
  it('tem que ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('tem que exibir os dados da cidade', () => {
    const cityNameElement = fixture.debugElement.query(
      By.css('.card')
    ).nativeElement;
    expect(cityNameElement.textContent).toContain('Belém'); // verificaa se o nome da cidade esta correto
  });
});
