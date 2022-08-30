import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { UserProfileService } from 'src/app/modules/user/services/user.service';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { TripClosingReasonEnum } from 'src/app/shared/enums/trip-closing-reason-enum';
import { TripStatusEnum } from 'src/app/shared/enums/trip-status-enum';
import { TripDTO } from '../../models/trip-dto';
import { TripSerachCriteria } from '../../models/trip-search-criteria.dto';
import { CarRequestService } from '../../services/car-request.service';

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

	toggleFilter() {
		this.showFilterControls = !this.showFilterControls;
	}
	onPageChange(event: any) {
		this.tripSearchCrieria.page = event;
		this.search();
	}
}
