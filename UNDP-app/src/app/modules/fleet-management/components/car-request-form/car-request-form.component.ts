import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarRequestDTO } from '../../models/car-request.dto';
import { CarRequestService } from '../../services/car-request.service';
import { Location } from '@angular/common';
import { CarRequestStatusEnum } from '../../../../shared/enums/car-request-status.enum';
declare var jQuery: any;

@Component({
	selector: 'app-car-request-form',
	templateUrl: './car-request-form.component.html'
})
export class CarRequestFormComponent {

	carRequestDTO: CarRequestDTO = new CarRequestDTO();
	imageSrc!: string;

	constructor(private carRequestService: CarRequestService,
		private route: ActivatedRoute,
		private toasterService: ToastrService,
		private location: Location) {
	}

	ngOnInit() {
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

	save() {

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
