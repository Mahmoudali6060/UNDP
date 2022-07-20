import { Injectable } from '@angular/core';
import { BaseEntityService } from '../../../shared/services/base-entity.service';

@Injectable()
export class UserProfileService extends BaseEntityService {
  controllerName = 'UserProfile'
}