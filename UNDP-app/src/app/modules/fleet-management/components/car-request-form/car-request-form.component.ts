import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestDTO } from '../../models/car-request.dto';
import { CarRequestService } from '../../services/car-request.service';
import { Location } from '@angular/common';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
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
	@Input() isCarRequestFromOut:boolean = false;
	isDisabled: boolean;
	constructor(private carRequestService: CarRequestService,
		private route: ActivatedRoute,
		private roueter : Router,
		private toasterService: ToastrService,
		private location: Location,
		private translate: TranslateService,
	) {
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
		this.roueter.navigate(['/fleet-management/car-request-list']);
	}
	back(){
		this.roueter.navigate(['/home']);
	  }
	save(frm: NgForm) {
		this.comparedate();
		if (!this.isValidDate) {
			this.toasterService.error(this.translate.instant("Errors.InvalidData"));
		}
		else {
			if (this.carRequestDTO.id) {
				this.carRequestService.update(this.carRequestDTO).subscribe(res => {
					this.toasterService.success("success");
					if(this.isCarRequestFromOut === false){
						this.cancel();
					}
					else{
						this.back();
					}
					this.isDisabled = true;
				})
			}
			else {
				this.carRequestDTO.carRequestStatusId = CarRequestStatusEnum.UnderReview;
				this.carRequestService.add(this.carRequestDTO).subscribe(res => {
					this.toasterService.success("success");
					this.isDisabled = true;
					if(this.isCarRequestFromOut === false){
						this.cancel();
					}
					else{
						this.back();
					}					
				})
			}
		}
	}
	validateDates(sDate: string, eDate: string) {
		this.isValidDate = true;
		if ((sDate == null || eDate == null)) {
			this.toasterService.error(this.translate.instant("Errors.StartDateAndEndDateAreRequired"));
			this.isValidDate = false;
		}

		if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
			//this.toasterService.error(this.translate.instant("Errors.EndDateShouldBeGreaterThanStartDate"));
			this.isValidDate = false;
		}
		if ((sDate != null && eDate != null) && (eDate) === (sDate)) {
			//this.toasterService.error(this.translate.instant("Errors.EndDateShouldBeGreaterThanStartDate"));
			this.isValidDate = false;
		}
		return this.isValidDate;
	}
	comparedate() {
		this.isValidDate = true;
		this.isValidDate = this.validateDates(this.carRequestDTO.dateFrom, this.carRequestDTO.dateTo);
		if (!this.isValidDate) {
			this.toasterService.error(this.translate.instant("Errors.EndDateShouldBeGreaterThanStartDate"));
		}
		if (this.isValidDate) {
			this.isValidDate = true;
		}
		return this.isValidDate;
	}
}
