import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarDTO } from '../../models/car-dto';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
	carDTO: CarDTO = new CarDTO();
  isDisabled: boolean;

  constructor(private carService: CarService,
		private route: ActivatedRoute,
		private roueter : Router,
		private toasterService: ToastrService,
		private translate: TranslateService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.getCarById(id);
		}
  }
	getCarById(userId: any) {
		this.carService.getById(userId).subscribe((res: any) => {
			this.carDTO = res;
		})
	}
  cancel() {
		this.roueter.navigate(['/car/car-list']);
	}
  save(frm: NgForm) {

			if (this.carDTO.id) {
				this.carService.update(this.carDTO).subscribe(res => {
					this.toasterService.success("success");
						this.cancel();

					this.isDisabled = true;
				})
			}
			else {
				this.carService.add(this.carDTO).subscribe(res => {
					this.toasterService.success("success");
					this.isDisabled = true;
						this.cancel();
				})
			}
	}
}
