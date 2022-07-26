import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileDTO } from '../../models/user-profile.dto';
import { UserProfileService } from '../../services/user.service';
import { Location } from '@angular/common';
declare var jQuery: any;

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html'
})
export class UserFormComponent {

	userProfileDTO: UserProfileDTO = new UserProfileDTO();
	imageSrc!: string;

	constructor(private userProfileService: UserProfileService,
		private route: ActivatedRoute,
		private toasterService: ToastrService,
		private location: Location) {
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.getUserById(id);
		}
	}

	getUserById(userId: any) {
		this.userProfileService.getById(userId).subscribe((res: any) => {
			this.userProfileDTO = res;
		})

	}

	cancel() {
		this.location.back();
	}
	save() {

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
