import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {
  isAdmin:boolean
  isSuperVisor:boolean
  serverUrl:string;
  constructor(
    public authService: AuthService,
    private _configService: ConfigService,
    private router:Router,
    private helperService:HelperService

   ) {
    this.serverUrl = _configService.getServerUrl();
    this.isAdmin = this.helperService.IsAdmin();
    this.isSuperVisor = this.helperService.IsSupervisor();
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(["/home"]);

  }
}
