import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileDTO } from 'src/app/modules/user/models/user-profile.dto';
import { UserProfileService } from 'src/app/modules/user/services/user.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  role: any
  serverUrl: string;
  subscription: Subscription;
  userProfile: any;
  messages: any[] = [];
  constructor(
    public authService: AuthService,
    private _configService: ConfigService,
    private router: Router,
    private helperService: HelperService,
    private userProfileService: UserProfileService
  ) {
    
  }

  ngOnInit(): void {
    this.serverUrl = this._configService.getServerUrl();
    this.role = this.helperService.getRole();
    console.log("role", this.role)
//     this.helperService.UserObservable.subscribe(message => {
//       alert("done from SideMenu")
//      // console.log("userProfile",this.messages)
//  });
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(["/home"]);

  }
}
