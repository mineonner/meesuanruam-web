import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { getItemLocalStorage, setItemLocalStorage } from '../../../core/services/local-storage.service';
import { storageNames } from './storage-name';
import { UserModel } from '../model/respone/User.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn = false;
  userData:UserModel
  constructor( private router: Router,){
    // this.isLoggedIn= true;
  }

  ngOnInit(): void {

  }

  get isLoggedIn() {
  //  this.userData = JSON.parse(sessionStorage.getItem('userData')) as User;
    if(this.accessToken){
      return true;
    }else{
      return false;
    }
  }

  set accessToken(token: string) {
    if (typeof (token) !== "undefined" && token !== null) {
      setItemLocalStorage(storageNames.token, token);
    } else this.redirectLogin();
  }

  get accessToken(): string {
    return getItemLocalStorage(storageNames.token);
  }

  set userEmail(token: string) {
      setItemLocalStorage(storageNames.email, token);
  }

  get userEmail(): string {
    return getItemLocalStorage(storageNames.email);
  }

  redirectLogin() {
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }
}
