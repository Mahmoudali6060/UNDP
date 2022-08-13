import { Component, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
import { CarRequestPageTypeEnum } from '../../../../shared/enums/care-request-page-type.enum';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { AvailabilitySearchCriteriaDTO } from '../../../user/models/availability-search-criteria-dto';
import { UserProfileDTO } from '../../../user/models/user-profile.dto';
import { UserProfileService } from '../../../user/services/user.service';
import { CarRequestSearchCriteriaDTO } from '../../models/car-request-search-criteria.dto';
import { CarRequestDTO } from '../../models/car-request.dto';
import { ClosingReasonDTO } from '../../models/closing-reason.dto';
import { AvailableDriversPopupService } from '../../services/available-drivers-popup.service';
import { CarRequestService } from '../../services/car-request.service';
import { ClosingReasonPopupService } from '../../services/closing-reason-popup.service';

@Component({
	selector: 'app-car-request-list',
	templateUrl: './car-request-list.component.html',
	styleUrls: ['./car-request-list.component.css']
})
export class CarRequestListComponent {

	//#region  Variables
	carRequestSearchCrieria: CarRequestSearchCriteriaDTO = new CarRequestSearchCriteriaDTO();
	carRequestList: Array<CarRequestDTO>;// = new Array<CarRequestDTO>();
	carRequestStatusEnum = CarRequestStatusEnum;
	showFilterControls: boolean = false;
	total: number;
	pageTitle: string;
	careRequestPageType = CarRequestPageTypeEnum;
	carRequestStatusList: any;
	@Input() selectedCarRequestPageType: CarRequestPageTypeEnum = CarRequestPageTypeEnum.Index;//selected by default
	@Input() loggedUserId: number;//Passed from Car Request My Index Page
	//#endregion

	constructor(private carRequestService: CarRequestService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private authService: AuthService,
		private userProfileService: UserProfileService,
		private availableDriversDialogService: AvailableDriversPopupService,
		private closingReasonPopupService: ClosingReasonPopupService

	) {

	}

	ngOnInit() {
		this.carRequestSearchCrieria.carRequestStatusId = 0;
		this.carRequestStatusList = Object.keys(this.carRequestStatusEnum).filter(f => !isNaN(Number(f)));
		this.setPageTitle();
		this.search();
	}

	setPageTitle() {
		switch (this.selectedCarRequestPageType) {
			case CarRequestPageTypeEnum.Completed:
				this.pageTitle = this.translate.instant('FleetManagement.CarRequestCompleted')
				break;
			case CarRequestPageTypeEnum.MyIndex:
				this.pageTitle = this.translate.instant('FleetManagement.CarRequestMyInbox')
				break;
			case CarRequestPageTypeEnum.Annonymous:
				this.pageTitle = this.translate.instant('FleetManagement.CarRequestList')
				break;
			default:
				this.pageTitle = this.translate.instant('FleetManagement.CarRequestInbox')
				break;
		}
	}

	getAllCarRequests() {
		this.carRequestService.getAll(this.carRequestSearchCrieria).subscribe((res: any) => {
			this.carRequestList = res.list;
			this.total = res.total;
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

	public assignToMe(item: CarRequestDTO) {
		item.supervisorId = this.authService.loggedUserProfile.id;
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

	toggleFilter() {
		this.showFilterControls = !this.showFilterControls;
	}

	search() {
		this.applyFilters();
		this.getAllCarRequests();
	}

	applyFilters() {
		if (this.loggedUserId) {
			this.carRequestSearchCrieria.userProfileId = this.loggedUserId;
		}
		if (this.selectedCarRequestPageType == CarRequestPageTypeEnum.Completed) {
			this.carRequestSearchCrieria.carRequestStatusId = CarRequestStatusEnum.Closed;
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

	onPageChange(event: any) {
		this.carRequestSearchCrieria.page = event;
		this.search();
	}

	//#region  Handle Available Drivers
	getAllAvailableDrivers(item: CarRequestDTO) {
		debugger;
		let availabilitySearchCriteriaDTO: AvailabilitySearchCriteriaDTO = new AvailabilitySearchCriteriaDTO();
		availabilitySearchCriteriaDTO.DateFrom = item.dateFrom;
		availabilitySearchCriteriaDTO.DateTo = item.dateTo;
		this.userProfileService.getAllAvailableDrivers(availabilitySearchCriteriaDTO).subscribe((res: any) => {
			if (res && res.length > 0)
				this.openAvailableDriversDialog(res, item);
			else {
				this.toastrService.warning(this.translate.instant("Warning.NoDriversAvialable"));
				this.openClosingReasonDialog(item);
			}
		});
	}

	public openAvailableDriversDialog(avaliableDrivers: Array<UserProfileDTO>, selectedCarRequest: CarRequestDTO) {
		this.availableDriversDialogService.show(avaliableDrivers, 'sm')
			.then((driverId) => {
				if (driverId) {
					selectedCarRequest.carRequestStatusId = CarRequestStatusEnum.Approved;
					selectedCarRequest.driverId = driverId;
					this.updateCarRequest(selectedCarRequest);
				}
			})
			.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
	}

	public openClosingReasonDialog(selectedCarRequest: CarRequestDTO) {
		this.closingReasonPopupService.show('sm')
			.then((closingReasonDTO: ClosingReasonDTO) => {
				if (closingReasonDTO) {
					selectedCarRequest.closingReasonId = closingReasonDTO.closingReasonId;
					selectedCarRequest.closingReasonComment = closingReasonDTO.comment;
					selectedCarRequest.carRequestStatusId = CarRequestStatusEnum.Closed;
					this.updateCarRequest(selectedCarRequest);
				}
			})
			.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
	}
	//#endregion

	closeRequest(item: CarRequestDTO) {
		this.openClosingReasonDialog(item);
	}
}
