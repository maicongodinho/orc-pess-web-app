import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ReceitasService } from 'src/app/shared/services/receitas.service';
import TableUtils from 'src/app/shared/utils/table.utils';

@Component({
  selector: 'app-receita-list',
  templateUrl: './receita-list.component.html',
  styleUrls: ['./receita-list.component.scss'],
})
export class ReceitaListComponent {
  datePipe = new DatePipe('en');
  model = new TableModel();
  findAllSubject = new BehaviorSubject(true);
  findAll$ = this.findAllSubject.pipe(
    switchMap(() =>
      this.receitasService.findAll().pipe(
        map(data => {
          this.model.data = data.map(receita => [
            new TableItem({
              data: this.datePipe.transform(receita.data, 'dd/MM/yyyy'),
            }),
            new TableItem({ data: `R$ ${receita.valor}` }),
            new TableItem({ data: receita.descricao }),
            new TableItem({ data: receita.categoriaNome ? receita.categoriaNome : 'Não informada' }),
            new TableItem({ data: receita._id }),
          ]);
          return data;
        })
      )
    )
  );
  openExcluirModal = false;

  constructor(
    protected receitasService: ReceitasService,
    protected router: Router,
    private notificationService: NotificationService
  ) {
    this.model.header = [
      new TableHeaderItem({
        data: 'Data',
      }),
      new TableHeaderItem({
        data: 'Valor',
      }),
      new TableHeaderItem({
        data: 'Descrição',
      }),
      new TableHeaderItem({
        data: 'Categoria',
      }),
      new TableHeaderItem({
        data: 'Id',
      }),
    ];
  }

  onEditarClick(): void {
    const selected = TableUtils.getSelectedItem(this.model);
    this.router.navigate(['receitas', 'edit', selected[4].data]);
  }

  onExcluirClick(): void {
    const selected = TableUtils.getSelectedItem(this.model);
    this.receitasService.delete(selected[4].data).subscribe(() => {
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
      this.findAllSubject.next(true);
    });
  }
}
