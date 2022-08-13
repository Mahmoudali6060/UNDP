import { Component, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarRequestPageTypeEnum } from '../../../../shared/enums/care-request-page-type.enum';
@Component({
	selector: 'app-car-request-list-annonymous',
	templateUrl: './car-request-list-annonymous.component.html',
	styleUrls: ['./car-request-list-annonymous.component.css']
})
export class CarRequestListAnnonymousComponent {

	//#region  Variables
	careRequestPageType= CarRequestPageTypeEnum;
	//#endregion


	constructor() {

	}

	ngOnInit() {

	}

}
