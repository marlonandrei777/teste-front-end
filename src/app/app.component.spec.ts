import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // inicializar a fixture e o componente
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'teste-front-end' title`, () => {
    expect(component.title).toEqual('teste-front-end'); //
  });

  // verificando se existe o <router-outlet>
  it('tem que conter <router-outlet> no template', () => {
    const routerOutletDebugElement = fixture.debugElement.query(
      By.directive(RouterOutlet)
    );
    expect(routerOutletDebugElement).not.toBeNull();
  });
});
