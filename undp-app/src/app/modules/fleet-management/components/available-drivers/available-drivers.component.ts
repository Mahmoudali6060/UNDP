
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileDTO } from '../../../user/models/user-profile.dto';
@Component({
  selector: 'app-available-drivers',
  templateUrl: './available-drivers.component.html'
})

export class AvailableDriversComponent {

  driverId: number;
  driverList: Array<UserProfileDTO>;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

    console.log(this.driverList);
  }

  public cancel() {
    this.activeModal.close(null);
  }

  public ok() {
    this.activeModal.close(this.driverId);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }



}
