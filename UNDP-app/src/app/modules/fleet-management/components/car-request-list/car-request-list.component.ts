import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
import { DataSourceModel } from '../../../../shared/models/data-source.model';
import { FilterModel } from '../../../../shared/models/filter.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { CarRequestSearchCriteriaDTO } from '../../models/car-request-search-criteria.dto';
import { CarRequestDTO } from '../../models/car-request.dto';
import { CarRequestService } from '../../services/car-request.service';
declare var jQuery: any;

@Component({
	selector: 'app-car-request-list',
	templateUrl: './car-request-list.component.html'
})
export class CarRequestListComponent {

	//#region  Variables
	carRequestSearchCrieria: CarRequestSearchCriteriaDTO = new CarRequestSearchCriteriaDTO();
	carRequestList: Array<CarRequestDTO>;// = new Array<CarRequestDTO>();
	loggedUserId: number;
	carRequestStatusEnum = CarRequestStatusEnum;
	showFilterControls: boolean = false;
	total: number;
	//#endregion

	form!: FormGroup;
	students: any = [];
	searchTerm: string = '';
	reload: EventEmitter<boolean> = new EventEmitter();
	isLoadingStudents: boolean = false;
	recordsPerPage: number = 5;

	constructor(private carRequestService: CarRequestService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastrService: ToastrService,
		private translate: TranslateService,
		private authService: AuthService,
		private route: ActivatedRoute
	) {

	}

	ngOnInit() {
		this.loggedUserId = Number(this.route.snapshot.paramMap.get('loggedUserId'));
		this.search();
		
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
		item.userProfileId = this.authService.loggedUserProfile.id;
		this.updateCarRequest(item);
	}

	updateCarRequest(item: CarRequestDTO) {
		this.carRequestService.update(item).subscribe((res: any) => {
			if (res) {
				this.toastrService.success(this.translate.instant("Message.RequestAssignedSuccessfully"));
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
}
