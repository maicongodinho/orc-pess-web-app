import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { CategoriasService } from 'src/app/shared/services/categorias.service';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.scss'],
})
export class CategoriaAddComponent {
  form = this.fb.group({
    nome: this.fb.nonNullable.control('', Validators.required),
    descricao: this.fb.nonNullable.control(''),
  });

  get nome() {
    return this.form.controls.nome;
  }

  get descricao() {
    return this.form.controls.descricao;
  }

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onEnviarClick() {
    if (this.form.valid) {
      this.categoriasService.save(this.form.getRawValue()).subscribe(() => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Categoria inserida com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        this.router.navigate(['/categorias']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancelarClick() {
    this.router.navigate(['categorias']);
  }
}
