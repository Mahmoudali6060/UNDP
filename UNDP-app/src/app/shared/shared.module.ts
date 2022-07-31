import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import arSaLocale from '@angular/common/locales/ar-SA';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared/modules/material.module';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HelperService } from './services/helper.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ChangeLangagueComponent } from './components/change-langague/change-langague.component';
import { UserProfileService } from '../modules/user/services/user.service';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PagerService } from './services/pager.service';
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ScrollToModule.forRoot(),
    TranslateModule,
    HttpClientModule,
    NgSelectModule,
    OrderModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    HttpClientModule,
    SweetAlert2Module,
    ScrollToModule,
    NgSelectModule,
    OrderModule,
    NgbModule,
    PaginationComponent,
    MaterialModule,
    ChangeLangagueComponent
    // ModalBasicComponent
  ],
  declarations: [
    ConfirmationDialogComponent,
    PaginationComponent,
    ChangeLangagueComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  providers: [
    DatePipe,
    AuthGuardService,
    HelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    UserProfileService,
    ConfirmationDialogService,
    PagerService
  ],
})


export class SharedModule {
  // static forRoot(): ModuleWithProviders<SharedModule> {
  //   return {
  //     ngModule: SharedModule
  //   };
  // }
}
registerLocaleData(arSaLocale);
