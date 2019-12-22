import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  faEdit = faEdit;
  faWindowClose = faWindowClose;
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => {
      this.members = members
    });
  }
  
  goToAddMemberForm() {
    this.router.navigate(['add-member']);
  }

  editMemberByID(id: number) {
    this.router.navigate(['member-details', {id: id}]);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMemberById(id).then(()=>{
      this.appService.getMembers().subscribe(members => {
        this.members = members
      });
    });
  }
}
