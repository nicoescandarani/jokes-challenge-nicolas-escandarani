import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';
import { AlertTypeOptions } from 'src/app/utils/utils';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An unknown error occurred!';
        let errorType: AlertTypeOptions = 'error';

        if (error.error instanceof ErrorEvent) {
          // Client-side error.
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error.
          switch (error.status) {
            case 404:
              errorMsg = 'Error 404: Resource not found';
              errorType = 'error';
              break;
            default:
              errorMsg = `Error Status: ${error.status}\nMessage: ${error.message}`;
              errorType = 'error';
          }
        }

        this.alertService.showError(errorMsg, errorType);
        return throwError(error);
      })
    );
  }
}
