import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileDTO } from './modules/user/models/user-profile.dto';
import { LocalStorageItems } from './shared/constants/local-storage-items';
import { HelperService } from './shared/services/helper.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base-app';
  constructor(private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private helpserService: HelperService) {
    let userProfileDTO = this.localStorageService.getItem(LocalStorageItems.userProfile) as UserProfileDTO;
   // if (userProfileDTO) {
    //  this.helpserService.useLanguage(userProfileDTO.defaultLanguage);
   // }
 //   else {
      translate.setDefaultLang('en');
      translate.currentLang = 'en';
  //  }

  }
}
