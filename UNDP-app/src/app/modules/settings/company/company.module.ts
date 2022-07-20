import { NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyService } from './services/company.service';

@NgModule({
  imports: [
    CompanyRoutingModule,
    SharedModule,
  ],
  declarations: [
    CompanyListComponent,
    CompanyFormComponent
  ],
  providers: [
    CompanyService
  ]
})

export class CompanyModule {
}
