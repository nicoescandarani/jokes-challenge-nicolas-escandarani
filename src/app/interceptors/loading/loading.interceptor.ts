import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let timeout = setTimeout(() => this.spinnerService.show(), 200); // Only show spinner for long requests.

    return next.handle(request).pipe(
      finalize(() => {
        clearTimeout(timeout);
        this.spinnerService.hide();
      })
    );
  }
}
