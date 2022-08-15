import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileDTO } from 'src/app/modules/user/models/user-profile.dto';
import { LocalStorageItems } from '../constants/local-storage-items';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public selectedUser = new BehaviorSubject<UserProfileDTO>(
    this.getSelectedUser()
);
  constructor(private localStorageService:LocalStorageService) { 

}
getSelectedUser(): UserProfileDTO {
  return this.localStorageService.getItem(LocalStorageItems.userProfile) as UserProfileDTO;
}
sendMessage(message: UserProfileDTO) {
  this.selectedUser.next(message);
}
}