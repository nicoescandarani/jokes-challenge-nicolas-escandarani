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

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Message based on the error.
        let errorMsg = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Client-side error.
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error.
          errorMsg = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        this.alertService.showError(errorMsg); // Call to the alert service.
        return throwError(error);
      })
    );
  }
}
