import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { APP_BASE_HREF } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let appService: AppService;
  let setUsernameSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BannerComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AppService]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.removeItem('username');
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    appService = debugElement.injector.get(AppService);
    setUsernameSpy = spyOn(appService,'setUsername').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'softrams-racing'`, async(() => {
    expect(component.title).toEqual('softrams-racing');
  }));

  it('should create the app service', async(() => {
    expect(component.appService).toBeTruthy();
  }));

  it('should not have logged in user by default', async(() => {
    expect(component.appService.username).toBeNull();
  }));

  it('should log in user from local storage if a valid username exists', async(() => {
    localStorage.setItem('username', 'a');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.appService.username).toBe('a');
  }));
  
  it('should override empty user if a valid username exists in local storage', async(() => {
    localStorage.setItem('username', '');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    localStorage.setItem('username', 'a');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.appService.username).toBe('a');
  }));

  it('should set username if available', ()=>{
    appService.username = 'test';
    component.ngOnInit()
    expect(setUsernameSpy).toHaveBeenCalled();
  });
});
