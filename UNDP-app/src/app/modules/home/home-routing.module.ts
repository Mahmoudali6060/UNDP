import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRequestComponent } from './Components/car-request/car-request.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const routes: Routes = [
  { path :'', component: LandingPageComponent},
  { path :'CarRequest', component: CarRequestComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
