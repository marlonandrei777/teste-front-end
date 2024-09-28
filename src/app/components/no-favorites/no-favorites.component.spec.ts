import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoFavoritesComponent } from './no-favorites.component';
import { provideHttpClient } from '@angular/common/http';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('NoFavoritesComponent', () => {
  let component: NoFavoritesComponent;
  let fixture: ComponentFixture<NoFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoFavoritesComponent],
      providers: [provideHttpClient(), SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(NoFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
