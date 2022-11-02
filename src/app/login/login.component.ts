import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { UsuariosService } from '../shared/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  state: 'login' | 'register' = 'login';
  loginForm = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    senha: this.fb.nonNullable.control('', Validators.required),
  });
  registerForm = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    nome: this.fb.nonNullable.control('', Validators.required),
    sobrenome: this.fb.nonNullable.control(''),
    senha: this.fb.nonNullable.control('', Validators.required),
  });

  get emailLogin() {
    return this.loginForm.controls.email;
  }

  get senhaLogin() {
    return this.loginForm.controls.senha;
  }

  get emailRegister() {
    return this.registerForm.controls.email;
  }

  get nomeRegister() {
    return this.registerForm.controls.nome;
  }

  get sobrenomeRegister() {
    return this.registerForm.controls.sobrenome;
  }

  get senhaRegister() {
    return this.registerForm.controls.senha;
  }

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  entrarClick() {
    if (this.loginForm.valid) {
      this.usuariosService.logIn(this.loginForm.getRawValue()).subscribe(data => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Login efetuado com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        localStorage.setItem('ORC_PSS_TOKEN', data.token);
        this.router.navigate(['dashboard']);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  registrarClick() {
    if (this.registerForm.valid) {
      this.usuariosService.register(this.registerForm.getRawValue()).subscribe(data => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Usuário registrado com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        localStorage.setItem('ORC_PSS_TOKEN', data.token);
        this.router.navigate(['dashboard']);
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
