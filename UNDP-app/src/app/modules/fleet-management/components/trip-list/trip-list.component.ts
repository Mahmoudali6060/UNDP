import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { AvailabilitySearchCriteriaDTO } from 'src/app/modules/user/models/availability-search-criteria-dto';
import { UserProfileDTO } from 'src/app/modules/user/models/user-profile.dto';
import { UserProfileService } from 'src/app/modules/user/services/user.service';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { TripClosingReasonEnum } from 'src/app/shared/enums/trip-closing-reason-enum';
import { TripStatusEnum } from 'src/app/shared/enums/trip-status-enum';
import { TripDTO } from '../../models/trip-dto';
import { TripSerachCriteria } from '../../models/trip-search-criteria.dto';
import { CarRequestService } from '../../services/car-request.service';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-trip-list',
	templateUrl: './trip-list.component.html',
	styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
	tripSearchCrieria: TripSerachCriteria = new TripSerachCriteria();
	tripList: Array<TripDTO>;
	tripStatusEnum = TripStatusEnum;
	tripClosingReasonEnum = TripClosingReasonEnum
	showFilterControls: boolean = false;
	total: number;
	pageTitle: string;
	tripStatusList: any;
	tripClosingReasonList: any
	@Input() loggedUserId: number;
	@Input() istripsLandingPage: boolean = false;
	@ViewChild(PaginationComponent) paginationComponent: PaginationComponent;
	driversList: UserProfileDTO[] = [];
	fileName= 'Trip.xlsx';
	constructor(private carRequestService: CarRequestService,
		private translate: TranslateService,
		private authService: AuthService,
		private userProfileService: UserProfileService) { }

	ngOnInit(): void {
		this.tripSearchCrieria.tripStatusId = 0;
		this.tripSearchCrieria.tripClosingReasonId = 0
		this.tripStatusList = Object.keys(this.tripStatusEnum).filter(f => !isNaN(Number(f)));
		this.tripClosingReasonList = Object.keys(this.tripClosingReasonEnum).filter(f => !isNaN(Number(f)));
		this.search();
		this.getAllDrivers();
	}
	search() {
		this.getAllTrips();
	}
	getAllTrips() {
		this.carRequestService.getAllTrips(this.tripSearchCrieria).subscribe((res: any) => {
			this.tripList = res.list;
			this.total = res.total;
			if (this.paginationComponent) {
				this.paginationComponent.totalRecordsCount = this.total;
				this.paginationComponent.setPagination(this.tripSearchCrieria.page);
			}
		});
	}
	exportexcel(): void
	{
	  /* pass here the table id */
	  let element = document.getElementById('excel-table');
	  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
	  /* generate workbook and add the worksheet */
	  const wb: XLSX.WorkBook = XLSX.utils.book_new();
	  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
	  /* save to file */  
	  XLSX.writeFile(wb, this.fileName);
   
	}
	//#region    Drivers
	getAllDrivers() {
		let availabilitySearchCriteriaDTO: AvailabilitySearchCriteriaDTO = new AvailabilitySearchCriteriaDTO();
		this.userProfileService.getAllDrivers(availabilitySearchCriteriaDTO).subscribe((res: any) => {
			if (res && res.length > 0)
				this.driversList = res
		});
	}
	toggleFilter() {
		this.showFilterControls = !this.showFilterControls;
	}
	onPageChange(event: any) {
		this.tripSearchCrieria.page = event;
		this.search();
	}
}
