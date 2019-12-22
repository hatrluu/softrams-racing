import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { By } from '@angular/platform-browser';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [HttpClient, FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('MemberDetailsComponent Isolated Test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('form is invalid when empty', () => {
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is invalid when only firstName is filled', () => {
      component.memberForm.controls['firstName'].setValue('a');
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is invalid when only lastName is filled', () => {
      component.memberForm.controls['lastName'].setValue('a');
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is invalid when only jobTitle is filled', () => {
      component.memberForm.controls['jobTitle'].setValue('a');
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is invalid when only team is filled', () => {
      component.memberForm.controls['team'].setValue('a');
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is invalid when only status is filled', () => {
      component.memberForm.controls['status'].setValue('Active');
      expect(component.memberForm.valid).toBeFalsy();
    })

    it('form is valid when filled', fakeAsync(() => {
      component.teamExist = true;
      component.memberForm.controls['firstName'].setValue('a');
      component.memberForm.controls['lastName'].setValue('a');
      component.memberForm.controls['jobTitle'].setValue('a');
      component.memberForm.controls['team'].setValue('a');
      component.memberForm.controls['status'].setValue('Active');

      flush();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.memberForm.valid).toBeTruthy();
      })
    }))
  });

  describe('MemberDetailsComponent Shallow Test', () => {
    it('created a form with username and password input and login button defined', () => {
      const firstNameContainer = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastNameContainer = fixture.debugElement.query(By.css('#lastName')).nativeElement;
      const jobTitleContainer = fixture.debugElement.query(By.css('#jobTitle')).nativeElement;
      const teamContainer = fixture.debugElement.query(By.css('#team')).nativeElement;
      const statusContainer = fixture.debugElement.query(By.css('#activeStatus')).nativeElement;
      const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.pull-right')).nativeElement;
      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-outline-secondary.pull-right.mr-2')).nativeElement;
      expect(firstNameContainer).toBeDefined();
      expect(lastNameContainer).toBeDefined();
      expect(jobTitleContainer).toBeDefined();
      expect(teamContainer).toBeDefined();
      expect(statusContainer).toBeDefined();
      expect(submitBtnContainer).toBeDefined();
      expect(cancelBtnContainer).toBeDefined();
    });

    it('submit button is disabled when form is blank', () => {
      const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.pull-right')).nativeElement;
      expect(submitBtnContainer.disabled).toBeTruthy();
    });

    it('login button is enabled when form is filled', fakeAsync(() => {
      component.memberForm.controls['firstName'].setValue('a');
      component.memberForm.controls['lastName'].setValue('a');
      component.memberForm.controls['jobTitle'].setValue('a');
      component.memberForm.controls['team'].setValue('a');
      component.memberForm.controls['status'].setValue('Active');

      flush();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.pull-right')).nativeElement;
        expect(submitBtnContainer.disabled).toBeFalsy();
      })
    }));

    it('AddMemberComponent cancel() should called ', fakeAsync(() => {
      spyOn(component, 'cancel');

      const cancelBtnContainer = fixture.debugElement.query(By.css('.btn.btn-outline-secondary.pull-right.mr-2')).nativeElement;
      cancelBtnContainer.click();
      fixture.detectChanges();

      expect(component.cancel).toHaveBeenCalled();
    }));

    it('AddMemberComponent addMember() should called ', fakeAsync(() => {
      spyOn(component, 'onSubmit');

      component.memberForm.controls['firstName'].setValue('a');
      component.memberForm.controls['lastName'].setValue('a');
      component.memberForm.controls['jobTitle'].setValue('a');
      component.memberForm.controls['team'].setValue('a');
      component.memberForm.controls['status'].setValue('Active');

      flush();

      fixture.whenStable().then(() => {
        const submitBtnContainer = fixture.debugElement.query(By.css('.btn.btn-primary.pull-right')).nativeElement;
        submitBtnContainer.click();
        fixture.detectChanges();

        expect(component.onSubmit).toHaveBeenCalled();
      })
    }));
  });
});
