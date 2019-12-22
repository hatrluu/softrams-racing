import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    // If user close browser after 10 minutes, user will be logged out
    window.onbeforeunload = ()=>{
      let login = parseInt(localStorage.getItem('onLogin'));
      let logout = new Date().getTime();
      let duration = logout - login;
      if(duration > 10*60*1000){
        this.logout()
      }
    }
  }

  logout() {
    this.appService.username = '';
    if(localStorage.getItem('rememberMe') == 'false'){
      localStorage.removeItem('username');
    }
    localStorage.removeItem('onLogin');
    this.router.navigate(['/login']);
  }
}
