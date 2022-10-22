import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarListComponent } from './Components/car-list/car-list.component';
import { CarFormComponent } from './Components/car-form/car-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarService } from './services/car.service';


@NgModule({
  declarations: [CarListComponent, CarFormComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    SharedModule

  ],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
providers: [
  CarService
]
})
export class CarModule { }
