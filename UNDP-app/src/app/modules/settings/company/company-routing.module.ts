import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'company-from', component: CompanyFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
