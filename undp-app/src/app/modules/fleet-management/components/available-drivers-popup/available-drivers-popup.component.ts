
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileDTO } from '../../../user/models/user-profile.dto';
@Component({
  selector: 'app-available-drivers-popup',
  templateUrl: './available-drivers-popup.component.html'
})

export class AvailableDriversPopupComponent {

  driverId: number;
  selectedDriver: UserProfileDTO | undefined;
  driverList: Array<UserProfileDTO>;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  public cancel() {
    this.activeModal.close(null);
  }

  public ok() {
    if (this.driverId) {
      this.selectedDriver = this.driverList.find(x => x.id == this.driverId);
      this.activeModal.close(this.selectedDriver);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }



}
