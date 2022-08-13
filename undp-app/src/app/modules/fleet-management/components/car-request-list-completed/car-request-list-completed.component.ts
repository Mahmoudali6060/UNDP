import { Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarRequestPageTypeEnum } from '../../../../shared/enums/care-request-page-type.enum';
@Component({
	selector: 'app-car-request-list-completed',
	templateUrl: './car-request-list-completed.component.html',
	styleUrls: ['./car-request-list-completed.component.css']
})
export class CarRequestListCompletedComponent {

	//#region  Variables
	careRequestPageType= CarRequestPageTypeEnum;
	//#endregion


	constructor() {

	}

	ngOnInit() {

	}

}
