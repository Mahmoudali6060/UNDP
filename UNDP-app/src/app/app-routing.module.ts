import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/authentication/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },

  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
