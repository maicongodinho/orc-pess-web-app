import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import TableUtils from 'src/app/shared/utils/table.utils';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss'],
})
export class CategoriaListComponent {
  model = new TableModel();
  findAllSubject = new BehaviorSubject(true);
  findAll$ = this.findAllSubject.pipe(
    switchMap(() =>
      this.categoriasService.findAll().pipe(
        map(data => {
          this.model.data = data.map(categoria => [
            new TableItem({ data: categoria.nome }),
            new TableItem({ data: categoria.descricao }),
            new TableItem({ data: categoria._id }),
          ]);
          return data;
        })
      )
    )
  );
  openExcluirModal = false;

  constructor(
    protected categoriasService: CategoriasService,
    protected router: Router,
    private notificationService: NotificationService
  ) {
    this.model.header = [
      new TableHeaderItem({
        data: 'Nome',
      }),
      new TableHeaderItem({
        data: 'Descrição',
      }),
      new TableHeaderItem({
        data: 'Id',
      }),
    ];
  }

  onEditarClick(): void {
    const selected = TableUtils.getSelectedItem(this.model);
    this.router.navigate(['categorias', 'edit', selected[2].data]);
  }

  onExcluirClick(): void {
    const selected = TableUtils.getSelectedItem(this.model);
    this.categoriasService.delete(selected[2].data).subscribe(data => {
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
      this.findAllSubject.next(true);
    });
  }
}
