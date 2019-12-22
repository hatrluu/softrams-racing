import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  describe('BannerComponent Isolated Test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it(`welcome container doesn't exist when user isn't logged in`, () => {
      const welcomeContainer = fixture.debugElement.query(By.css('.welcome'));
      expect(welcomeContainer).toBeFalsy();
    });

    it('welcome container exists when user is logged in', () => {
      component.appService.username = 'a';
      fixture.detectChanges();

      const welcomeContainer = fixture.debugElement.query(By.css('.welcome'));
      expect(welcomeContainer).toBeTruthy();
    });

    it('welcome container has correct text when user is logged in', () => {
      component.appService.username = 'a';
      fixture.detectChanges();

      const welcomeContainer = fixture.debugElement.query(By.css('.welcome')).nativeElement;
      const welcomeText = 'Welcome ' + component.appService.username + ', logout here';
      expect(welcomeContainer.textContent).toContain(welcomeText);
    });
  });
  
  describe('BannerComponent Shallow Test', () => {
    it('logout function is called when the logout text is clicked', () => {
      const logoutSpy = spyOn(component, 'logout');

      component.appService.username = 'a';
      fixture.detectChanges();

      const logoutContainer = fixture.debugElement.query(By.css('.logout.text-primary')).nativeElement;
      logoutContainer.click();
      
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('logout function is called when the logout text is clicked', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.appService.username = 'a';
      fixture.detectChanges();

      const logoutContainer = fixture.debugElement.query(By.css('.logout.text-primary')).nativeElement;
      logoutContainer.click();
      
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
