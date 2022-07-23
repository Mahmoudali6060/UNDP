import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { LocalStorageItems } from '../../../../shared/constants/local-storage-items';
import { HelperService } from '../../../../shared/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean = false;//For showing or error message in case invalid username or password
  clicked = false;
  constructor(private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private helperService: HelperService,
    public translate: TranslateService) {

  }

  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.authService.login(credentials).subscribe((response: any) => {
      if (response) {
        this.localStorageService.setItem(LocalStorageItems.token, response.token);
        this.localStorageService.setItem(LocalStorageItems.email, response.email);
        this.localStorageService.setItem(LocalStorageItems.userProfile, response);
        this.helperService.useLanguage(response.DefaultLanguage);
        console.log("LocalStorageItems",LocalStorageItems)
        this.invalidLogin = false;
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
