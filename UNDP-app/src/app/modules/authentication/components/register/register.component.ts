import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register.model';
import { LocalStorageItems } from '../../../../shared/constants/local-storage-items';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { UserProfileDTO } from '../../../user/models/user-profile.dto';
import { HelperService } from '../../../../shared/services/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerModel: RegisterModel = new RegisterModel();

  constructor(private router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private helperService: HelperService) {

  }

  register(form: NgForm) {
    let userData = form.value as UserProfileDTO;
    userData.defaultLanguage = this.translate.currentLang ? this.translate.currentLang : 'ar';
    this.authService.register(userData).subscribe((response: any) => {
      let token = (<any>response).Token;
      this.localStorageService.setItem(LocalStorageItems.token, token);
      this.localStorageService.setItem(LocalStorageItems.userProfile, response);
      this.helperService.useLanguage(response.DefaultLanguage);
      this.router.navigate(["/dashboard"]);
      // }, err => {
    });
  }


}
