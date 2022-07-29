import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageItems } from '../constants/local-storage-items';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(private spinner: NgxSpinnerService,
        private notificationService: NotificationService,
        private localStorageService: LocalStorageService,
        private translate: TranslateService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let handled: boolean = false;
        let token = this.localStorageService.getToken();
        const clonedReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(clonedReq)
            .pipe(
                catchError((returnedError: any) => {
                    let errorMessage;

                    if (returnedError.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${returnedError.error.message}`;
                    } else if (returnedError instanceof HttpErrorResponse && !returnedError.error.errors) {
                        errorMessage = `Error Status ${returnedError.status}: ${returnedError.error.error} - ${returnedError.error.message}`;
                        handled = this.handleServerSideError(returnedError);
                    }
                    else {
                        errorMessage =`Error Status ${returnedError.status}: ${returnedError.error.error} - ${returnedError.error.message}`;
                        handled = this.handleServerSideErrorFromDataAnnotation(returnedError);
                    }
                    console.error(errorMessage ? errorMessage : returnedError);

                    if (!handled) {
                        if (errorMessage) {
                            return throwError(errorMessage);
                        } else {
                            return throwError("Unexpected problem occurred");
                        }
                    } else {
                        return of(returnedError);
                    }
                })
            )
    }
    private handleServerSideErrorFromDataAnnotation(error: any): boolean {
       var test= Object.keys(error.error.errors);
        let transaltedErrorMessage = this.translate.instant('Errors.'+test[1]);
        let handled: boolean = false;
        switch (error.status) {
            case 401:
                // this.routeMessageService.message = "Please login again.";
                // this.authenticationService.logout();
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;
            case 403:
                // this.routeMessageService.message = "Please login again.";
                // this.authenticationService.logout();
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;

            case 500:
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;
        }
        return handled;
    }

    private handleServerSideError(error: HttpErrorResponse): boolean {
        let transaltedErrorMessage = this.translate.instant(error.error.Message);
        let handled: boolean = false;
        switch (error.status) {
            case 401:
                // this.routeMessageService.message = "Please login again.";
                // this.authenticationService.logout();
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;
            case 403:
                // this.routeMessageService.message = "Please login again.";
                // this.authenticationService.logout();
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;

            case 500:
                this.notificationService.showError(transaltedErrorMessage, this.translate.instant("General.Error"));
                handled = true;
                break;
        }
        return handled;
    }

}