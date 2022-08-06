import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
  role:any
  serverUrl:string ;
  constructor(
    public authService: AuthService,
    private _configService: ConfigService,
    private router:Router,
    private helperService:HelperService

   ) {

  }
  ngOnInit(): void {
    this.serverUrl = this._configService.getServerUrl();
    this.role = this.helperService.getRole(); 
    console.log("role",this.role)
  
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(["/home"]);

  }
}
