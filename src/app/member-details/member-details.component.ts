import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { statusValidator } from '../status.directive';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  curMemberId: number = -1;
  teamExist = true;

  constructor(private fb: FormBuilder, private appService: AppService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required, this.checkTeamValid.bind(this)),
      status: new FormControl('', statusValidator)
    });
    this.appService.getTeams().subscribe(teams=>{
      this.teams = teams;
    })
    this.curMemberId = this.route.params['_value'].id;
    this.appService.getMemberByID(this.curMemberId).subscribe(member=>{
      if(!this.teams.find(team => team.teamName == member.team)){
        this.teamExist = false;
      }
      this.memberForm.setValue({
        firstName: member.firstName,
        lastName: member.lastName,
        jobTitle: member.jobTitle,
        team: member.team,
        status: member.status
      })
    })
  }
  ngOnChanges(){
  }
  onChange(){
    this.teamExist = true;
  }
  checkTeamValid(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!this.teamExist){
          return resolve({ Invalid:'Team not exist'})
        } else { return resolve(null) }
      });
    })
  }
  cancel(){
    window.history.back();
  }
  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    this.appService.editMemberById(this.curMemberId,this.memberModel).then(()=>{
      this.router.navigate(['members'])
    });
  }
}
