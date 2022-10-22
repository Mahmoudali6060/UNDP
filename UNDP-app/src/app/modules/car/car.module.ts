import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarRoutingModule } from './car-routing.module';
import { CarListComponent } from './Components/car-list/car-list.component';
import { CarFormComponent } from './Components/car-form/car-form.component';
import { CarService } from './services/car.service';


@NgModule({
  imports: [
    CarRoutingModule,
    SharedModule

  ],
  declarations: [CarListComponent, CarFormComponent],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
providers: [
  CarService
]
})
export class CarModule { }
