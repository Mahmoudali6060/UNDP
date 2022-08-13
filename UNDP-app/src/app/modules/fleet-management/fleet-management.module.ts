import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AvailableDriversPopupComponent } from './components/available-drivers-popup/available-drivers-popup.component';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListAnnonymousComponent } from './components/car-request-list-annonymous/car-request-list-annonymous.component';
import { CarRequestListCompletedComponent } from './components/car-request-list-completed/car-request-list-completed.component';
import { CarRequestListMyIndexComponent } from './components/car-request-list-my-index/car-request-list-my-index.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';
import { ClosingReasonPopupComponent } from './components/closing-reason-popup/closing-reason-popup.component';
import { FleetManagementRoutingModule } from './fleet-management-routing.module';
import { AvailableDriversPopupService } from './services/available-drivers-popup.service';
import { CarRequestService } from './services/car-request.service';
import { ClosingReasonPopupService } from './services/closing-reason-popup.service';

@NgModule({
  imports: [
    FleetManagementRoutingModule,
    SharedModule,
  ],
  declarations: [
    CarRequestListComponent,
    CarRequestFormComponent,
    AvailableDriversPopupComponent,
    ClosingReasonPopupComponent,
    CarRequestListCompletedComponent,
    CarRequestListMyIndexComponent,
    CarRequestListAnnonymousComponent
  ],
  providers: [
    CarRequestService,
    AvailableDriversPopupService,
    ClosingReasonPopupService
  ],
  exports: [
    CarRequestFormComponent,
    CarRequestListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class FleetManagementModule {
}
