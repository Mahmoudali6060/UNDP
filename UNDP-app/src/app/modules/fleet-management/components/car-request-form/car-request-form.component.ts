import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestDTO } from '../../models/car-request.dto';
import { CarRequestService } from '../../services/car-request.service';
import { Location } from '@angular/common';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
import { NgForm } from '@angular/forms';
declare var jQuery: any;

@Component({
	selector: 'app-car-request-form',
	templateUrl: './car-request-form.component.html',
	styleUrls: ['./car-request-form.component.css']

})
export class CarRequestFormComponent {

	carRequestDTO: CarRequestDTO = new CarRequestDTO();
	imageSrc!: string;
	isValidDate: boolean;
	maxDate: Date
	constructor(private carRequestService: CarRequestService,
		private route: ActivatedRoute,
		private toasterService: ToastrService,
		private location: Location) {
	}

	ngOnInit() {
		this.maxDate = new Date();
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.getCarRequestById(id);
		}
	}

	getCarRequestById(userId: any) {
		this.carRequestService.getById(userId).subscribe((res: any) => {
			this.carRequestDTO = res;
		})
	}

	cancel() {
		this.location.back();
	}

	save(frm: NgForm) {
		if (!this.isValidDate) {
			this.toasterService.error("Please Insert Add valid Data")
		}
		else {
			if (this.carRequestDTO.id) {
				this.carRequestService.update(this.carRequestDTO).subscribe(res => {
					this.toasterService.success("success");
					this.cancel();
				})
			}
			else {
				this.carRequestDTO.carRequestStatusId = CarRequestStatusEnum.InProgress;
				this.carRequestService.add(this.carRequestDTO).subscribe(res => {
					this.toasterService.success("success");
					this.cancel();
				})
			}
		}
	}
	validateDates(sDate: string, eDate: string) {
		this.isValidDate = true;
		if ((sDate == null || eDate == null)) {
			this.toasterService.error("Start date and end date are required.")
			this.isValidDate = false;
		}

		if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
			this.toasterService.error("End date should be greater than start date.")

			this.isValidDate = false;
		}
		return this.isValidDate;
	}
	comparedate() {
		this.isValidDate = true;
		this.isValidDate = this.validateDates(this.carRequestDTO.dateFrom, this.carRequestDTO.dateTo);
		if (!this.isValidDate) {
			this.toasterService.error("End date should be greater than start date.")
		}
		if (this.isValidDate) {
			this.isValidDate = true;
		}
		return this.isValidDate;
	}
}
