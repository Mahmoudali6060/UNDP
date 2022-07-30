import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserProfileService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthModule } from '../authentication/auth.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    UserListComponent,
    UserFormComponent,
    ProfileComponent
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    UserProfileService
  ]
})
export class UserModule {
}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}