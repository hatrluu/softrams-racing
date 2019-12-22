import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMemberComponent } from './add-member.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  describe('AddMemberComponent Isolated Test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('form is invalid when empty', () => {
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is invalid when only firstName is filled', () => {
      component.addMemberForm.controls['firstName'].setValue('a');
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is invalid when only lastName is filled', () => {
      component.addMemberForm.controls['lastName'].setValue('a');
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is invalid when only jobTitle is filled', () => {
      component.addMemberForm.controls['jobTitle'].setValue('a');
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is invalid when only team is filled', () => {
      component.addMemberForm.controls['team'].setValue('a');
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is invalid when only status is filled', () => {
      component.addMemberForm.controls['status'].setValue('Active');
      expect(component.addMemberForm.valid).toBeFalsy();
    })

    it('form is valid when filled', () => {
      component.addMemberForm.controls['firstName'].setValue('a');
      component.addMemberForm.controls['lastName'].setValue('a');
      component.addMemberForm.controls['jobTitle'].setValue('a');
      component.addMemberForm.controls['team'].setValue('a');
      component.addMemberForm.controls['status'].setValue('Active');
      expect(component.addMemberForm.valid).toBeTruthy();
    })
  });
  
  describe('AddMemberComponent Shallow Test', () => {
    it('created a form with all containers defined', () => {
      const firstNameContainer = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastNameContainer = fixture.debugElement.query(By.css('#lastName')).nativeElement;
      const jobTitleContainer = fixture.debugElement.query(By.css('#jobTitle')).nativeElement;
      const teamContainer = fixture.debugElement.query(By.css('#team')).nativeElement;
      const statusContainer = fixture.debugElement.query(By.css('#activeStatus')).nativeElement;
      const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.w-40.m-2')).nativeElement;
      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-secondary.w-40.m-2')).nativeElement;
      expect(firstNameContainer).toBeDefined();
      expect(lastNameContainer).toBeDefined();
      expect(jobTitleContainer).toBeDefined();
      expect(teamContainer).toBeDefined();
      expect(statusContainer).toBeDefined();
      expect(submitBtnContainer).toBeDefined();
      expect(cancelBtnContainer).toBeDefined();
    });

    it('submit button is disabled when form is blank', () => {
      fixture.detectChanges();

      const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.w-40.m-2')).nativeElement;
      expect(submitBtnContainer.disabled).toBeTruthy();
    });

    it('cancel button is enabled when form is blank', () => {
      fixture.detectChanges();

      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-secondary.w-40.m-2')).nativeElement;
      expect(cancelBtnContainer.disabled).toBeFalsy();
    });

    it('submit button is enabled when form is filled', () => {
      component.addMemberForm.controls['firstName'].setValue('a');
      component.addMemberForm.controls['lastName'].setValue('a');
      component.addMemberForm.controls['jobTitle'].setValue('a');
      component.addMemberForm.controls['team'].setValue('a');
      component.addMemberForm.controls['status'].setValue('Active');
      fixture.detectChanges();

      const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.w-40.m-2')).nativeElement;
      expect(submitBtnContainer.disabled).toBeFalsy();
    });

    it('AddMemberComponent cancel() should called when cancel button is clicked', fakeAsync(() => {
      const cancelSpy = spyOn(component, 'cancel');

      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-secondary.w-40.m-2')).nativeElement;
      cancelBtnContainer.click();
      fixture.detectChanges();

      expect(cancelSpy).toHaveBeenCalled();
    }));

    it('AddMemberComponent cancel() should called when cancel button is clicked', fakeAsync(() => {
      const backHistorySpy = spyOn(window.history, 'back');

      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-secondary.w-40.m-2')).nativeElement;
      cancelBtnContainer.click();
      fixture.detectChanges();

      expect(backHistorySpy).toHaveBeenCalled();
    }));
  });
});
