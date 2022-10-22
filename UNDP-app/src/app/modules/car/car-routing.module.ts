import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/services/auth.guard';
import { CarFormComponent } from './Components/car-form/car-form.component';
import { CarListComponent } from './Components/car-list/car-list.component';

const routes: Routes = [
  { path: '', component: CarListComponent,canActivate: [AuthGuard] },
  { path: 'car-list', component: CarListComponent,canActivate: [AuthGuard] },
  { path: 'car-form', component: CarFormComponent },
  { path: 'car-form/:id', component: CarFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
