import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFavoritesComponent } from './no-favorites.component';

describe('NoFavoritesComponent', () => {
  let component: NoFavoritesComponent;
  let fixture: ComponentFixture<NoFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
