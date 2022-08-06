import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvailableDriversComponent } from '../components/available-drivers/available-drivers.component';
import { UserProfileDTO } from '../../user/models/user-profile.dto';


@Injectable()
export class AvailableDriversDialogService {

    constructor(private modalService: NgbModal) { }

    public show(driverList: Array<UserProfileDTO>, dialogSize: 'sm' | 'lg' = 'sm'): Promise<number> {
        const modalRef = this.modalService.open(AvailableDriversComponent, { size: dialogSize });
        modalRef.componentInstance.driverList = driverList;
        return modalRef.result;
    }

}