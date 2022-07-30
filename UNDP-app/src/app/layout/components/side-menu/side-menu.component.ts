import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {

  serverUrl:string;
  constructor(
    public authService: AuthService,
    private _configService: ConfigService,
    private router:Router

   ) {
    this.serverUrl = _configService.getServerUrl();

  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(["login"]);

  }
}
