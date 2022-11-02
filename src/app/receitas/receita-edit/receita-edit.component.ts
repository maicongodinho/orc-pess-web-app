import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItem, NotificationService } from 'carbon-components-angular';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { ReceitaDb } from 'src/app/shared/models/receita-db.model';
import { Receita } from 'src/app/shared/models/receita.model';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ReceitasService } from 'src/app/shared/services/receitas.service';

@Component({
  selector: 'app-receita-edit',
  templateUrl: './receita-edit.component.html',
  styleUrls: ['./receita-edit.component.scss'],
})
export class ReceitaEditComponent implements OnInit, OnDestroy {
  private id!: string;
  private routeParamsSub!: Subscription;

  findOne$!: Observable<ReceitaDb>;
  form = this.fb.group({
    data: this.fb.nonNullable.control([] as string[], Validators.required),
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
  openExcluirModal = false;

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
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.findOne$ = this.receitasService.findOne(this.id).pipe(
        map(receita => {
          this.form.patchValue({
            data: [receita.data],
            valor: receita.valor,
            descricao: receita.descricao,
            categoriaId: receita.categoriaId,
          });
          return receita;
        }),
        catchError(error => {
          this.router.navigate(['receitas']);
          return of(error);
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  onEnviarClick() {
    if (this.form.valid) {
      const updatedReceita: Receita = {
        data: this.data.value[0],
        valor: this.valor.value,
        descricao: this.descricao.value,
        categoriaId: this.categoriaId.value.length > 0 ? this.categoriaId.value : '',
        usuarioId: '',
      };

      this.receitasService.update(this.id, updatedReceita).subscribe(() => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Receita atualizada com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        this.router.navigate(['/receitas']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onExcluirClick() {
    this.receitasService.delete(this.id).subscribe(() => {
      this.notificationService.showToast({
        showClose: true,
        duration: 5000,
        type: 'success',
        title: 'Sucesso ✨',
        caption: `Receita excluída com sucesso!`,
        target: '.notification-container',
        lowContrast: true,
      });
      this.openExcluirModal = false;
      this.router.navigate(['/receitas']);
    });
  }

  onCancelarClick() {
    this.router.navigate(['receitas']);
  }

  search(event: string) {
    this.categoriaListItems.filter(item => item.content.toLowerCase().indexOf(event.toLowerCase()) !== -1);
  }
}
