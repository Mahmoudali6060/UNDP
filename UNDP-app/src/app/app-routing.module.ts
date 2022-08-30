import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/authentication/services/auth.guard';
import { LandingPageComponent } from './modules/home/Components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./modules/authentication/auth.module').then(m => m.AuthModule),canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) ,canActivate: [AuthGuard]},

   { path: '**', redirectTo: '/home' },
  {path :'**', component: LandingPageComponent}
  //{path :'', component: LandingPageComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
