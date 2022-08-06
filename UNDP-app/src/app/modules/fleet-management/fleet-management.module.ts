import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AvailableDriversComponent } from './components/available-drivers/available-drivers.component';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';
import { FleetManagementRoutingModule } from './fleet-management-routing.module';
import { AvailableDriversDialogService } from './services/available-drivers-dialog.service';
import { CarRequestService } from './services/car-request.service';

@NgModule({
  imports: [
    FleetManagementRoutingModule,
    SharedModule,
  ],
  declarations: [
    CarRequestListComponent,
    CarRequestFormComponent,
    AvailableDriversComponent
  ],
  providers: [
    CarRequestService,
    AvailableDriversDialogService
  ],
  exports: [
    CarRequestFormComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class FleetManagementModule {
}
