import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from 'carbon-components-angular';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private usuariosService: UsuariosService, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.notificationService.showNotification({
            type: 'error',
            title: 'Ops!',
            subtitle: 'Ocorreu um erro',
            caption: error.error,
            target: '.notification-container',
            lowContrast: true,
          });
        } else {
          if (error.status === 400) {
            this.notificationService.showToast({
              showClose: true,
              duration: 5000,
              type: 'warning',
              title: '',
              caption: error.error.message,
              target: '.notification-container',
              lowContrast: true,
            });
          } else if (error.status === 403) {
            this.notificationService.showToast({
              type: 'warning',
              showClose: true,
              duration: 5000,
              title: '',
              caption: error.error.message,
              target: '.notification-container',
              lowContrast: true,
            });
            this.usuariosService.signOut();
          } else {
            this.notificationService.showToast({
              type: 'error',
              showClose: true,
              duration: 5000,
              title: 'Ops!',
              subtitle: 'Ocorreu um erro.',
              caption: error.error.message,
              target: '.notification-container',
              lowContrast: true,
            });
          }
        }

        return throwError(() => error);
      })
    );
  }
}
