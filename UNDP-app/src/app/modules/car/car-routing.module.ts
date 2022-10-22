import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/services/auth.guard';
import { CarListComponent } from './Components/car-list/car-list.component';

const routes: Routes = [
  { path: 'car-list', component: CarListComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
