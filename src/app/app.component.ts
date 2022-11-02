import { Component } from '@angular/core';
import { UsuariosService } from './shared/services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hasHamburger = false;
  openLogoutModal = false;

  constructor(public usuariosService: UsuariosService) {}

  onLogoutClick() {
    this.openLogoutModal = false;
    this.usuariosService.signOut();
  }
}
