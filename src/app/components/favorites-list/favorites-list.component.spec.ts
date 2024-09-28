import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesListComponent } from './favorites-list.component';
import { provideHttpClient } from '@angular/common/http';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesListComponent],
      providers: [provideHttpClient(), SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
