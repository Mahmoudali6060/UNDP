import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DataSourceModel } from '../../../../shared/models/data-source.model';
import { FilterModel } from '../../../../shared/models/filter.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { CarRequestDTO } from '../../models/car-request.dto';
import { CarRequestService } from '../../services/car-request.service';
declare var jQuery: any;

@Component({
	selector: 'app-car-request-list',
	templateUrl: './car-request-list.component.html'
})
export class CarRequestListComponent {

	dataSource: DataSourceModel = new DataSourceModel();
	carRequestList: Array<CarRequestDTO> = new Array<CarRequestDTO>();
	loggedUserId: number;
	constructor(private carRequestService: CarRequestService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private authService: AuthService,
		private route: ActivatedRoute
	) {

	}

	ngOnInit() {
		debugger;
		this.loggedUserId = Number(this.route.snapshot.paramMap.get('loggedUserId'));

		this.getAllCarRequests();
	}

	getAllCarRequests() {
		this.applyFilters();
		this.carRequestService.getAll(this.dataSource).subscribe((res: any) => {
			this.carRequestList = res.list;
		});
	}

	delete(id: any) {
		this.carRequestService.delete(id).subscribe((res: any) => {
			if (res) {
				this.toastrService.success(this.translate.instant("Message.DeletedSuccessfully"));
				this.getAllCarRequests();
			}
		});
	}

	public assginToMe(item: CarRequestDTO) {
		item.userProfileId = this.authService.loggedUserProfile.id;
		this.updateCarRequest(item);
	}

	updateCarRequest(item: CarRequestDTO) {
		this.carRequestService.update(item).subscribe((res: any) => {
			if (res) {
				this.toastrService.success(this.translate.instant("Message.UpdatedSuccessfully"));
				this.getAllCarRequests();
			}
		});
	}

	applyFilters() {
		if (this.loggedUserId) {
			let userProfileIdFilter: FilterModel = new FilterModel();
			userProfileIdFilter.key = "UserProfileId";
			userProfileIdFilter.value = this.loggedUserId.toString();
			userProfileIdFilter.operator = "=";
			this.dataSource.filter.push(userProfileIdFilter);
		}
	}

	public openConfirmationDialog(item: CarRequestDTO) {
		this.confirmationDialogService.confirm(this.translate.instant("ConfirmaionDialog.Title"), this.translate.instant("ConfirmaionDialog.Description"))
			.then((confirmed) => {
				if (confirmed) {
					this.delete(item.id);
				}
			})
			.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
	}
}
