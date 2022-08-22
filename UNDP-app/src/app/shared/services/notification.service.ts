import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from '../models/notification.model';
import { HttpHelperService } from './http-helper.service';

@Injectable(
    { providedIn: 'root' }
)
export class NotificationService {
    controllerName: string = "Notification";

    constructor(public httpHelperService: HttpHelperService) {
    }

    sendNotification(entity: NotificationModel) {
        return this.httpHelperService.post(`${this.controllerName}/Send/`, entity);
    }

}
