import { Injectable } from '@angular/core';
import { BaseEntityService } from '../../../shared/services/base-entity.service';
import { HttpHelperService } from '../../../shared/services/http-helper.service';
import { AvailabilitySearchCriteriaDTO } from '../models/availability-search-criteria-dto';

@Injectable()
export class UserProfileService extends BaseEntityService {
  controllerName = 'UserProfile';


  getAllAvailableDrivers(availabilitySearchCriteriaDTO: AvailabilitySearchCriteriaDTO): any {
    return this.httpHelperService.post(this.controllerName + '/GetAllDrivers', availabilitySearchCriteriaDTO);
  }

}