import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../models/credenciais.model';
import { Login } from '../models/login.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient, private router: Router) {}

  register(usuario: Usuario): Observable<Login> {
    return this.http.post<Login>(`${environment.api}/usuarios/registrar`, usuario).pipe(
      map(data => {
        this.saveLogin(data);
        this.saveToken(data.token);
        return data;
      })
    );
  }

  logIn(credenciais: Credenciais): Observable<Login> {
    return this.http.post<Login>(`${environment.api}/usuarios/login`, credenciais).pipe(
      map(data => {
        this.saveLogin(data);
        this.saveToken(data.token);
        return data;
      })
    );
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem('ORC_PSS_TOKEN');
    window.sessionStorage.setItem('ORC_PSS_TOKEN', token);
  }

  saveLogin(login: Login): void {
    window.sessionStorage.removeItem('ORC_LOGIN');
    window.sessionStorage.setItem('ORC_LOGIN', JSON.stringify(login));
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('ORC_PSS_TOKEN');
  }

  getLogin(): Login | null {
    const loginFromStorage = window.sessionStorage.getItem('ORC_LOGIN');
    if (loginFromStorage) {
      const login = JSON.parse(loginFromStorage);
      if (login) return login;
    }
    return null;
  }
}
