import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileDTO } from '../../models/user-profile.dto';
import { UserProfileService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/shared/services/config.service';
import { NgForm } from '@angular/forms';
import { UserTypeEnum } from '../../models/user-type-enum';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LabelValuePair } from 'src/app/shared/enums/label-value-pair';
declare var jQuery: any;

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

	userProfileDTO: UserProfileDTO = new UserProfileDTO();
	imageSrc!: string;
	serverUrl: string;
	phonePatern = "^((\\+91-?)|0)?[0-9]{10}$";
	userTypeEnum: any
	userTypes: any
	types:any
	constructor(private userProfileService: UserProfileService,
		private route: ActivatedRoute,
		private toasterService: ToastrService,
		private location: Location, private _configService: ConfigService,
		private helperService: HelperService,
		private translate: TranslateService) {
	}

	ngOnInit() {
		this.userTypeEnum = UserTypeEnum;
		this.userTypes = this.helperService.enumSelector(this.userTypeEnum);
		console.log("userTypes",this.userTypes)
		this.imageSrc="assets/images/icon/avatar-big-01.jpg";
		this.userProfileDTO = new UserProfileDTO();
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.getUserById(id);
		}
	}
	getUserById(userId: any) {
		this.userProfileService.getById(userId).subscribe((res: any) => {
			this.userProfileDTO = res;
			this.serverUrl = this._configService.getServerUrl();
			this.imageSrc = this.serverUrl + "/wwwroot/Images/Users/" + this.userProfileDTO.imageUrl;
			if(!this.userProfileDTO.imageUrl){
				this.imageSrc="assets/images/icon/avatar-big-01.jpg";
			  }
		})

	}

	cancel() {
		this.location.back();
	}
	save(frm: NgForm) {
		   this.userProfileDTO.role = this.userTypeEnum[this.userProfileDTO.userTypeId]
		if (this.userProfileDTO.id) {
			this.userProfileService.update(this.userProfileDTO).subscribe(res => {
				this.toasterService.success("success");
				this.cancel();
			})
		}
		else {
			this.userProfileDTO.password = "P@ssw0rd"
			this.userProfileService.add(this.userProfileDTO).subscribe(res => {
				this.toasterService.success("success");
				this.cancel();
			})
		}
		//this.sendMessage();
		//this.helperService.postUserProfile('Message from Home Component to user form Component!');
	}
    sendMessage(): void {
        // send message to subscribers via observable subject
        this.helperService.sendMessage(new UserProfileDTO);
    }


	onFileChange(event: any) {

		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageSrc = reader.result as string;
				this.userProfileDTO.imageBase64 = this.imageSrc;

			};

		}
	}
}
