import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileDTO } from '../../user/models/user-profile.dto';
import { AvailableDriversPopupComponent } from '../components/available-drivers-popup/available-drivers-popup.component';


@Injectable()
export class AvailableDriversPopupService {

    constructor(private modalService: NgbModal) { }

    public show(driverList: Array<UserProfileDTO>, dialogSize: 'sm' | 'lg' = 'sm'): Promise<number> {
        const modalRef = this.modalService.open(AvailableDriversPopupComponent, { size: dialogSize });
        modalRef.componentInstance.driverList = driverList;
        return modalRef.result;
    }

}