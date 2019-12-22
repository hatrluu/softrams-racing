import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { statusValidator } from '../status.directive';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  addMemberForm: FormGroup;
  teams = [];
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getTeams().subscribe(teams=>{
      this.teams = teams;
    })
    this.addMemberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', statusValidator)
    });
  }

  addMember(){
    this.appService.addMember(this.addMemberForm.value).then(()=>{
      this.router.navigate(['members'])
    });
  }
  cancel(){
    window.history.back();
  }

}
