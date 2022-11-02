import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItem, NotificationService } from 'carbon-components-angular';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { DespesaDb } from 'src/app/shared/models/despesa-db.model';
import { Despesa } from 'src/app/shared/models/despesa.model';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { DespesasService } from 'src/app/shared/services/despesas.service';

@Component({
  selector: 'app-despesa-edit',
  templateUrl: './despesa-edit.component.html',
  styleUrls: ['./despesa-edit.component.scss'],
})
export class DespesaEditComponent implements OnInit, OnDestroy {
  private id!: string;
  private routeParamsSub!: Subscription;

  findOne$!: Observable<DespesaDb>;
  form = this.fb.group({
    data: this.fb.nonNullable.control([] as Date[], Validators.required),
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
    private despesasService: DespesasService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.findOne$ = this.despesasService.findOne(this.id).pipe(
        map(despesa => {
          this.form.patchValue({
            data: [despesa.data],
            valor: despesa.valor,
            descricao: despesa.descricao,
            categoriaId: despesa.categoriaId,
          });
          return despesa;
        }),
        catchError(error => {
          this.router.navigate(['despesas']);
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
      const updatedDespesa: Despesa = {
        data: this.data.value[0],
        valor: this.valor.value,
        descricao: this.descricao.value,
        categoriaId: this.categoriaId.value.length > 0 ? this.categoriaId.value : '',
        usuarioId: '',
      };

      this.despesasService.update(this.id, updatedDespesa).subscribe(() => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Despesa atualizada com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        this.router.navigate(['/despesas']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onExcluirClick() {
    this.despesasService.delete(this.id).subscribe(() => {
      this.notificationService.showToast({
        showClose: true,
        duration: 5000,
        type: 'success',
        title: 'Sucesso ✨',
        caption: `Despesa excluída com sucesso!`,
        target: '.notification-container',
        lowContrast: true,
      });
      this.openExcluirModal = false;
      this.router.navigate(['/despesas']);
    });
  }

  onCancelarClick() {
    this.router.navigate(['despesas']);
  }

  search(event: string) {
    this.categoriaListItems.filter(item => item.content.toLowerCase().indexOf(event.toLowerCase()) !== -1);
  }
}
