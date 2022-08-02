import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/home/Components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./modules/authentication/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },

   { path: '**', redirectTo: '/home' },
  {path :'**', component: LandingPageComponent}
  //{path :'', component: LandingPageComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
