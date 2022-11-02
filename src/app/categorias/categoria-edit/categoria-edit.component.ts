import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { CategoriaDb } from 'src/app/shared/models/categoria-db.model';
import { CategoriasService } from 'src/app/shared/services/categorias.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss'],
})
export class CategoriaEditComponent implements OnInit, OnDestroy {
  private id!: string;
  private routeParamsSub!: Subscription;

  findOneCategoria$!: Observable<CategoriaDb>;
  form = this.fb.group({
    nome: this.fb.nonNullable.control('', Validators.required),
    descricao: this.fb.nonNullable.control(''),
  });
  openExcluirModal = false;

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
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.findOneCategoria$ = this.categoriasService.findOne(this.id).pipe(
        map(data => {
          this.form.patchValue(data);
          return data;
        }),
        catchError(error => {
          this.router.navigate(['categorias']);
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
      this.categoriasService.update(this.id, this.form.getRawValue()).subscribe(data => {
        this.notificationService.showToast({
          showClose: true,
          duration: 5000,
          type: 'success',
          title: 'Sucesso ✨',
          caption: `Categoria "${data.nome}" atualizada com sucesso!`,
          target: '.notification-container',
          lowContrast: true,
        });
        this.router.navigate(['/categorias']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onExcluirClick() {
    this.categoriasService.delete(this.id).subscribe(data => {
      this.notificationService.showToast({
        showClose: true,
        duration: 5000,
        type: 'success',
        title: 'Sucesso ✨',
        caption: `Categoria "${data.nome}" excluída com sucesso!`,
        target: '.notification-container',
        lowContrast: true,
      });
      this.openExcluirModal = false;
      this.router.navigate(['/categorias']);
    });
  }

  onCancelarClick() {
    this.router.navigate(['categorias']);
  }
}
