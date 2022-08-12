import { Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
import { DataSourceModel } from '../../../../shared/models/data-source.model';
import { FilterModel } from '../../../../shared/models/filter.model';
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
import { CarRequestListComponent } from '../car-request-list/car-request-list.component';

@Component({
	selector: 'app-car-request-list-completed',
	templateUrl: './car-request-list-completed.component.html',
	styleUrls: ['./car-request-list-completed.component.css']
})
export class CarRequestListCompletedComponent {

	//#region  Variables
	carRequestSearchCrieria: CarRequestSearchCriteriaDTO = new CarRequestSearchCriteriaDTO();
	pageTitle: string;
	//#endregion


	constructor(private translate: TranslateService) {

	}

	ngOnInit() {
		this.carRequestSearchCrieria.carRequestStatusId = CarRequestStatusEnum.Closed;
		this.pageTitle = this.translate.instant('FleetManagement.CarRequestCompleted')
	}

}
