import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/services/auth.guard';
import { CarRequestFormComponent } from './components/car-request-form/car-request-form.component';
import { CarRequestListAnnonymousComponent } from './components/car-request-list-annonymous/car-request-list-annonymous.component';
import { CarRequestListCompletedComponent } from './components/car-request-list-completed/car-request-list-completed.component';
import { CarRequestListMyIndexComponent } from './components/car-request-list-my-index/car-request-list-my-index.component';
import { CarRequestListComponent } from './components/car-request-list/car-request-list.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

const routes: Routes = [
  { path: '', component: CarRequestListComponent },
  { path: 'car-request-list', component: CarRequestListComponent,canActivate: [AuthGuard] },
  { path: 'car-request-list-my-index/:loggedUserId', component: CarRequestListMyIndexComponent,canActivate: [AuthGuard] },
  { path: 'car-request-list-completed', component: CarRequestListCompletedComponent,canActivate: [AuthGuard] },
  { path: 'car-request-form', component: CarRequestFormComponent },
  { path: 'car-request-form/:id', component: CarRequestFormComponent ,canActivate: [AuthGuard]},
  { path: 'car-request-list-announmous', component: CarRequestListAnnonymousComponent,canActivate: [AuthGuard] },
  { path: 'trip-list', component: TripListComponent ,canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagementRoutingModule {
}
