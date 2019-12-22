import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public appService: AppService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.appService.username || this.appService.username.length > 0) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/401']);
        return false;
    }
}