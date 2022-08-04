import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FleetManagementModule } from '../fleet-management/fleet-management.module';
import { CarRequestComponent } from './Components/car-request/car-request.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    CarRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FleetManagementModule
  ],exports:[
    LandingPageComponent
  ]
})
export class HomeModule { }
