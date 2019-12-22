import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit() {
    if(this.appService.username && this.appService.username.length > 0){
      this.router.navigate(['/members']);
    }
  }

}
