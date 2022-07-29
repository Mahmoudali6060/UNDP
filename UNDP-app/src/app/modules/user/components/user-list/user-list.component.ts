import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/services/config.service';
import { DataSourceModel } from '../../../../shared/models/data-source.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { UserProfileDTO } from '../../models/user-profile.dto';
import { UserProfileService } from '../../services/user.service';
declare var jQuery: any;

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent {

	dataSource: DataSourceModel = new DataSourceModel();
	userList: Array<UserProfileDTO> = new Array<UserProfileDTO>();
	serverUrl: string;

	constructor(private userProfileService: UserProfileService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private _configService: ConfigService) {

	}

	ngOnInit() {
		this.getAllUsers();
	}

	getAllUsers() {
		this.userProfileService.getAll(this.dataSource).subscribe((res: any) => {
			this.userList = res.list;
		   this.serverUrl = this._configService.getServerUrl();

		});
	}

	delete(id: any) {
		this.userProfileService.delete(id).subscribe((res: any) => {
			if (res) {
				this.toastrService.success(this.translate.instant("Message.DeletedSuccessfully"));
				this.getAllUsers();
			}
		});
	}

	public openConfirmationDialog(item: UserProfileDTO) {
		this.confirmationDialogService.confirm(this.translate.instant("ConfirmaionDialog.Title"), this.translate.instant("ConfirmaionDialog.Description"))
			.then((confirmed) => {
				if (confirmed) {
					this.delete(item.id);
				}
			})
			.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
	}
}
