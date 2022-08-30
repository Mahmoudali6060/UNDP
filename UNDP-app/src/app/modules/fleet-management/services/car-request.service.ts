import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntityService } from '../../../shared/services/base-entity.service';
import { CarRequestTotalDetails } from '../models/car-request-total-details';

@Injectable({
  providedIn: "root"
})
export class CarRequestService extends BaseEntityService {
  controllerName = 'CarRequest'
  getAllCarRequestTotalDetails():Observable<any> {
    return this.httpHelperService.get(this.controllerName + '/GetAllCarRequestTotalDetails');
  }
  getAllTrips(dataSourceModel: any): any {
    return this.httpHelperService.post('Trip' + '/' + 'GetAll', dataSourceModel);
}
}