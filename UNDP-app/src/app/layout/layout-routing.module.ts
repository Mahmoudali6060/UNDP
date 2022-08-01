import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path :'', component: LandingPageComponent},
      { path: 'dashboard', loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'company', loadChildren: () => import('../modules/settings/company/company.module').then(m => m.CompanyModule) },
      { path: 'user', loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule) },
      { path: 'fleet-management', loadChildren: () => import('../modules/fleet-management/fleet-management.module').then(m => m.FleetManagementModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
