import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';
import { FleetManagementRoutingModule } from './fleet-management-routing.module';
import { CarRequestService } from './services/car-request.service';

@NgModule({
  imports: [
    FleetManagementRoutingModule,
    SharedModule,
  ],
  declarations: [
    CarRequestListComponent,
    CarRequestFormComponent
  ],
  providers: [
    CarRequestService
  ]
})

export class FleetManagementModule {
}
