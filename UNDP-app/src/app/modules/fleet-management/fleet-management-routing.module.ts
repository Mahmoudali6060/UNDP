import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListAnnonymousComponent } from './components/car-request-list-annonymous/car-request-list-annonymous.component';
import { CarRequestListCompletedComponent } from './components/car-request-list-completed/car-request-list-completed.component';
import { CarRequestListMyIndexComponent } from './components/car-request-list-my-index/car-request-list-my-index.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';

const routes: Routes = [
  { path: '', component: CarRequestListComponent },
  { path: 'car-request-list', component: CarRequestListComponent },
  { path: 'car-request-list-my-index/:loggedUserId', component: CarRequestListMyIndexComponent },
  { path: 'car-request-list-completed', component: CarRequestListCompletedComponent },
  { path: 'car-request-form', component: CarRequestFormComponent },
  { path: 'car-request-form/:id', component: CarRequestFormComponent },
  { path: 'car-request-list-announmous', component: CarRequestListAnnonymousComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagementRoutingModule {
}
