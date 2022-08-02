import { Component, OnInit } from '@angular/core';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseBackupComponent } from 'src/app/modules/database/components/database-backup/database-backup.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageItems } from 'src/app/shared/constants/local-storage-items';
import { UserProfileDTO } from 'src/app/modules/user/models/user-profile.dto';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  profile: UserProfileDTO;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService:LocalStorageService) {
  }
  ngOnInit(): void {
  }
  // getProfile(){
  //   this.router.navigate(['user/profile']);
  // }
  public toggleSideMenu() {

    if (!$('body').hasClass('layout-fullwidth')) {
      $('body').addClass('layout-fullwidth');

    } else {
      $('body').removeClass('layout-fullwidth');
      $('body').removeClass('layout-default'); // also remove default behaviour if set
    }

    $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

    if ($(window).innerWidth() < 1025) {
      if (!$('body').hasClass('offcanvas-active')) {
        $('body').addClass('offcanvas-active');
      } else {
        $('body').removeClass('offcanvas-active');
      }
    }

  }

  public switchLanguage(language: string) {

  }

  //#region Open Modal
  public openBackupModal(id?: number) {
    
  }
  //#endregion

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
