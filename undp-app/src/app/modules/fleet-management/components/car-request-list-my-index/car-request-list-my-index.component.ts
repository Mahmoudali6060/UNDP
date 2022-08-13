import { Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarRequestPageTypeEnum } from '../../../../shared/enums/care-request-page-type.enum';
@Component({
	selector: 'app-car-request-list-my-index',
	templateUrl: './car-request-list-my-index.component.html',
	styleUrls: ['./car-request-list-my-index.component.css']
})
export class CarRequestListMyIndexComponent {

	//#region  Variables
	careRequestPageType = CarRequestPageTypeEnum;
	loggedUserId: number;
	//#endregion


	constructor(private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.loggedUserId = Number(this.route.snapshot.paramMap.get('loggedUserId'));

	}

}
