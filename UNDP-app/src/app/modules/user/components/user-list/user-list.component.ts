import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/services/config.service';
import { DataSourceModel } from '../../../../shared/models/data-source.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import {  UserProfileSearchCriteriaDTO } from '../../models/user-list-search-criteria-dto';
import { UserProfileDTO } from '../../models/user-profile.dto';
import { UserProfileService } from '../../services/user.service';
declare var jQuery: any;

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent {

	dataSource: DataSourceModel = new DataSourceModel();
	userList: Array<UserProfileDTO> ;
	serverUrl: string;
	showFilterControls: boolean = false;
	searchCriteriaDTO:UserProfileSearchCriteriaDTO = new UserProfileSearchCriteriaDTO()
	total: number;
	recordsPerPage: number = 5;

	constructor(private userProfileService: UserProfileService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private _configService: ConfigService,
		private SpinnerService: NgxSpinnerService) {

	}

	ngOnInit() {
		this.search();
	}
	toggleFilter() {
		this.showFilterControls = !this.showFilterControls;
	}
	getAllUsers() {
		//this.SpinnerService.show();
		this.userProfileService.getAll(this.searchCriteriaDTO).subscribe((res: any) => {
			this.userList = res.list;
			this.total = res.total;
			this.serverUrl = this._configService.getServerUrl();

		});
	}
    search(){
		this.getAllUsers();
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
	onPageChange(event: any) {
		this.searchCriteriaDTO.page = event;
		this.getAllUsers();

		// this.search();
	}
}
