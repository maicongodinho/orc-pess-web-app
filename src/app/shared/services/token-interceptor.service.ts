import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private usuariosService: UsuariosService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usuariosService.getToken()}`,
      },
    });

    return next.handle(request);
  }
}
