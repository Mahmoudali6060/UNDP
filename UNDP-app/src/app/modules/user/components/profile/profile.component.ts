import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordComponent } from 'src/app/modules/authentication/components/reset-password/reset-password.component';
import { ResetPasswordDTO } from 'src/app/modules/authentication/models/reset-password-dto';
import { LocalStorageItems } from 'src/app/shared/constants/local-storage-items';
import { LabelValuePair } from 'src/app/shared/enums/label-value-pair';
import { ConfigService } from 'src/app/shared/services/config.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserProfileDTO } from '../../models/user-profile.dto';
import { UserTypeEnum } from '../../models/user-type-enum';
import { UserProfileService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit: boolean;
  ischangePassword: boolean;
  resetPassDto: ResetPasswordDTO;
  @ViewChild(ResetPasswordComponent) resetPasswordComponent: ResetPasswordComponent;
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  profile: UserProfileDTO;
  imageSrc: string;
  serverUrl: string;
  loggedProfile: UserProfileDTO;
  imageUrl: string;
  userTypeEnum:any;
  userTypes:LabelValuePair[];
  constructor(private helperService:HelperService,private userProfileService: UserProfileService, private _configService: ConfigService,private toasterService: ToastrService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.edit = false;
    this.ischangePassword=false;
    this.profile =  new UserProfileDTO();
    this.userTypeEnum = UserTypeEnum;
		this.userTypes = this.helperService.enumSelector(this.userTypeEnum);
    this.loggedProfile = this.localStorageService.getItem(LocalStorageItems.userProfile);
    this.getProfileById(this.loggedProfile.id);
  }
  getProfileById(profileId: any) {
		this.userProfileService.getById(profileId).subscribe((res: any) => {
			this.profile = res;
      this.imageUrl = this.profile.imageUrl;
			this.serverUrl = this._configService.getServerUrl();
			this.imageSrc = this.serverUrl+"/wwwroot/Images/Users/"+ this.profile.imageUrl ;
      if(!this.profile.imageUrl){
        this.imageSrc="assets/images/icon/avatar-big-01.jpg";
      }
		})

	}
  EditProfile() {
    this.edit = true;
  }
  save(frm: NgForm) {
    this.userProfileService.update(this.profile).subscribe(res => {
      if(res){
        this.getProfileById(this.profile.id)
        this.toasterService.success("success");
        this.edit = false;
      }
    })
  }
  changePassword() {
    this.ischangePassword = true;
  }
  closeChangePasswordCard(){
    this.ischangePassword = false;
  }
  close(){
    this.edit = false;
  }
  ConfirmeChangePassword() {
    this.resetPasswordComponent.resetPassword;
    this.closeChangePasswordCard();
  }
  onFileChange(event: any) {

		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageSrc = reader.result as string;
				this.profile.imageBase64 = this.imageSrc;

			};

		}
	}
}
