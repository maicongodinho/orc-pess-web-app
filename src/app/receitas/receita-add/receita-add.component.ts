import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListItem, NotificationService } from 'carbon-components-angular';
import { map } from 'rxjs';
import { Receita } from 'src/app/shared/models/receita.model';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ReceitasService } from 'src/app/shared/services/receitas.service';

@Component({
  selector: 'app-receita-add',
  templateUrl: './receita-add.component.html',
  styleUrls: ['./receita-add.component.scss'],
})
export class ReceitaAddComponent {
  form = this.fb.group({
    data: this.fb.nonNullable.control([new Date().toISOString()], Validators.required),
    valor: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]),
    descricao: this.fb.nonNullable.control(''),
    categoriaId: this.fb.nonNullable.control(''),
  });
  categoriaListItems: ListItem[] = [];
  findAllCategorias$ = this.categoriasService.findAll().pipe(
    map(data => {
      this.categoriaListItems = data.map(categoria => {
        return {
          content: categoria.nome,
          selected: false,
          value: categoria._id,
        } as ListItem;
      });
      return data;
    })
  );

  get data() {
    return this.form.controls.data;
  }

  get valor() {
    return this.form.controls.valor;
  }

  get descricao() {
    return this.form.controls.descricao;
  }

  get categoriaId() {
    return this.form.controls.categoriaId;
  }

  constructor(
    private fb: FormBuilder,
    private receitasService: ReceitasService,
    private router: Router,
    private notificationService: NotificationService,
    private categoriasService: CategoriasService
  ) {}

  onEnviarClick() {
    if (this.form.valid) {
      const newReceita: Receita = {
        data: this.data.value[0],
        valor: this.valor.value,
        descricao: this.descricao.value,
        categoriaId: this.categoriaId.value.length > 0 ? this.categoriaId.value : '',
        usuarioId: '',
      };

      this.receitasService.save(newReceita).subscribe(() => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Receita inserida com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        this.router.navigate(['/receitas']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancelarClick() {
    this.router.navigate(['receitas']);
  }

  search(event: string) {
    this.categoriaListItems.filter(item => item.content.toLowerCase().indexOf(event.toLowerCase()) !== -1);
  }
}
