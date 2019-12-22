import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('rememberMeChk') rememberMeChk: ElementRef;
  rememberMe: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public appService: AppService) {
  }

  ngOnInit() {
    if(this.appService.username && this.appService.username.length > 0){
      this.router.navigate(['/members']);
    }
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    if(localStorage.getItem('rememberMe') == 'true'){
      this.rememberMe = true;
      this.loginForm.patchValue({username: localStorage.getItem('username')})
      this.rememberMeChk.nativeElement.value = 'checked';
    }
  }
  checked(){
    this.rememberMe = !this.rememberMe;
  }
  login() {
    let time = new Date().getTime().toString();
    localStorage.setItem('username', this.loginForm.value.username);
    localStorage.setItem('onLogin', time);
    localStorage.setItem('rememberMe', this.rememberMe+'');
    this.appService.setUsername(this.loginForm.value.username);
    this.router.navigate(['/members']);
  }

}
