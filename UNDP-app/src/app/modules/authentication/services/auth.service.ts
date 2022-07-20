import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHelperService } from '../../../shared/services/http-helper.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LocalStorageItems } from '../../../shared/constants/local-storage-items';
import { UserProfileDTO } from '../../user/models/user-profile.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  public loggedUserProfile: UserProfileDTO;
  constructor(private _httpHelperService: HttpHelperService,
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.loggedUserProfile = this.localStorageService.getItem(LocalStorageItems.userProfile);
  }

  isUserAuthenticated() {
    let token: any = this.localStorageService.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  login(model: any): Observable<UserProfileDTO> {
    return this._httpHelperService.post("Account/Login", model) as Observable<UserProfileDTO>;
  }

  register(model: any) {
    return this._httpHelperService.post("Account/Register", model);
  }

  logOut() {
    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }

}








