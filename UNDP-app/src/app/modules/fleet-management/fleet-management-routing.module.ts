import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';

const routes: Routes = [
  { path: '', component: CarRequestListComponent },
  { path: 'car-request-list', component: CarRequestListComponent },
  { path: 'car-request-list/:loggedUserId', component: CarRequestListComponent },
  { path: 'car-request-form', component: CarRequestFormComponent },
  { path: 'car-request-form/:id', component: CarRequestFormComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagementRoutingModule {
}
