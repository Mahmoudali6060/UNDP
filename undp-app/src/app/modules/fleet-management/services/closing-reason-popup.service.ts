import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClosingReasonPopupComponent } from '../components/closing-reason-popup/closing-reason-popup.component';
import { ClosingReasonDTO } from '../models/closing-reason.dto';


@Injectable()
export class ClosingReasonPopupService {

    constructor(private modalService: NgbModal) { }

    public show(dialogSize: 'sm' | 'lg' = 'sm'): Promise<ClosingReasonDTO> {
        const modalRef = this.modalService.open(ClosingReasonPopupComponent, { size: dialogSize });
        return modalRef.result;
    }

}