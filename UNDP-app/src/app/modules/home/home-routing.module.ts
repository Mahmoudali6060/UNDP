import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from '../car/Components/car-list/car-list.component';
import { CarRequestComponent } from './Components/car-request/car-request.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const routes: Routes = [
  { path :'', component: LandingPageComponent},
  { path :'CarRequest', component: CarRequestComponent},
  { path :'CarList', component: CarListComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
