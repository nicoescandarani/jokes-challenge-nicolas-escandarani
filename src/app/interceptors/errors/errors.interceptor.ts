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
import { AlertTypeOptions } from 'src/app/shared/types/types';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = error.error.message || 'Unknown error';
        let errorType: AlertTypeOptions = 'error';
        this.alertService.showError(errorMsg, errorType);
        return throwError(error);
      })
    );
  }
}
