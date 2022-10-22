import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../modules/authentication/services/auth.guard';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path: 'dashboard',canActivate:[AuthGuard], loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'company',canActivate:[AuthGuard], loadChildren: () => import('../modules/settings/company/company.module').then(m => m.CompanyModule) },
      { path: 'user', canActivate:[AuthGuard],loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule) },
      { path: 'fleet-management',canActivate:[AuthGuard], loadChildren: () => import('../modules/fleet-management/fleet-management.module').then(m => m.FleetManagementModule) },
      { path: 'car', canActivate:[AuthGuard],loadChildren: () => import('../modules/car/car.module').then(m => m.CarModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
