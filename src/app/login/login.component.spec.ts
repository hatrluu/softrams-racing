import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  describe('Login Component Isolated Test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('form is invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
    })

    it('form is invalid when only username is filled', () => {
      component.loginForm.controls['username'].setValue('a');
      expect(component.loginForm.valid).toBeFalsy();
    })

    it('form is invalid when only password is filled', () => {
      component.loginForm.controls['password'].setValue('a');
      expect(component.loginForm.valid).toBeFalsy();
    })

    it('form is valid when filled', () => {
      component.loginForm.controls['username'].setValue('a');
      component.loginForm.controls['password'].setValue('a');
      expect(component.loginForm.valid).toBeTruthy();
    })
  });
  
  describe('Login Component Shallow Test', () => {
    it('created a form with username and password input and login button defined', () => {
      const usernameContainer = fixture.debugElement.query(By.css('#username')).nativeElement;
      const passwordContainer = fixture.debugElement.query(By.css('#password')).nativeElement;
      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      expect(usernameContainer).toBeDefined();
      expect(passwordContainer).toBeDefined();
      expect(loginBtnContainer).toBeDefined();
    });

    it('login button is disabled when form is blank', () => {
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      expect(loginBtnContainer.disabled).toBeTruthy();
    });

    it('login button is disabled when username is filled but password is not', () => {
      component.loginForm.controls['username'].setValue('a');
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      expect(loginBtnContainer.disabled).toBeTruthy();
    });

    it('login button is disabled when password is filled but username is not', () => {
      component.loginForm.controls['password'].setValue('a');
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      expect(loginBtnContainer.disabled).toBeTruthy();
    });

    it('login button is enabled when form is filled', () => {
      component.loginForm.controls['username'].setValue('a');
      component.loginForm.controls['password'].setValue('a');
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      expect(loginBtnContainer.disabled).toBeFalsy();
    });

    it('loginComponent login() should called when user clicks the login button with valid credentials', fakeAsync(() => {
      spyOn(component, 'login');

      component.loginForm.controls['username'].setValue('a');
      component.loginForm.controls['password'].setValue('a');
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      loginBtnContainer.click();
      fixture.detectChanges();

      expect(component.login).toHaveBeenCalled();
    }));

    it('router should navigate to /members when user clicks the login button with valid credentials', fakeAsync(() => {
      component.loginForm.controls['username'].setValue('a');
      component.loginForm.controls['password'].setValue('a');
      fixture.detectChanges();

      const loginBtnContainer = fixture.debugElement.query(By.css('.btn.w-100.btn-primary')).nativeElement;
      loginBtnContainer.click();
      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['/members']);
    }));

    it('should redirect the user to the members page if they are logged in', () => {
      component.appService.username = 'a';

      component.ngOnInit();
      
      expect(component.appService.username).toBe('a');
      expect(router.navigate).toHaveBeenCalledWith(['/members']);
    });
  });
});
