
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClosingReasonEnum } from '../../../../shared/enums/closing-reason.enum';
import { ClosingReasonDTO } from '../../models/closing-reason.dto';

@Component({
  selector: 'app-closing-reason-popup',
  templateUrl: './closing-reason-popup.component.html'
})

export class ClosingReasonPopupComponent {

  closingReasonDTO: ClosingReasonDTO = new ClosingReasonDTO();
  closingReasonList: any;
  closingReasonEnum = ClosingReasonEnum;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.closingReasonList = Object.keys(this.closingReasonEnum).filter(f => !isNaN(Number(f)));
    this.closingReasonDTO.closingReasonId = undefined;
  }

  public cancel() {
    this.activeModal.close(null);
  }

  public ok() {
    this.activeModal.close(this.closingReasonDTO);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }



}
