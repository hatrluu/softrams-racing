import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { By } from '@angular/platform-browser';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent, FaIconComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('MembersComponent Isolated Test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have add member button', () => {
      const addMemberButtonContainer = fixture.debugElement.query(By.css('#addMemberButton')).nativeElement;
      expect(addMemberButtonContainer).toBeTruthy();
    });
    
    it('should have empty members list', () => {
      expect(component.members.length).toBe(0);
    });

    it('should have members table', () => {
      const tableContainer = fixture.debugElement.query(By.css('.table')).nativeElement;
      expect(tableContainer).toBeTruthy();
    });
  });
  
  describe('MembersComponent Shallow Test', () => {
    beforeEach(() => {
      const testMember = {firstName: "a", lastName: "a", jobTitle: "a", team: "a", status: "a"}
      component.members = [testMember];
      fixture.detectChanges();
    });

    it('should call goToAddMemberForm when addMemberButton is clicked', () => {
      spyOn(component, 'goToAddMemberForm')
      const addMemberButtonContainer = fixture.debugElement.query(By.css('#addMemberButton')).nativeElement;
      addMemberButtonContainer.click();
      expect(component.goToAddMemberForm).toHaveBeenCalled();
    });

    it('should have member in members list', () => {
      expect(component.members.length).toBeGreaterThan(0);
    });

    it('should call editMemberByID when edit button is clicked', () => {
      spyOn(component, 'editMemberByID')

      const editMemberButtonContainer = fixture.debugElement.query(By.css('.btn.btn-default')).nativeElement;
      editMemberButtonContainer.click();

      expect(component.editMemberByID).toHaveBeenCalled();
    });

    it('should call deleteMemberById when delete button is clicked', () => {
      spyOn(component, 'deleteMemberById')

      const deleteMemberButtonContainer = fixture.debugElement.query(By.css('.btn.btn-default.delete')).nativeElement;
      deleteMemberButtonContainer.click();

      expect(component.deleteMemberById).toHaveBeenCalled();
    });
  });
});
