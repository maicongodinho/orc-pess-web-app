import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { DespesasService } from 'src/app/shared/services/despesas.service';
import TableUtils from 'src/app/shared/utils/table.utils';

@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.scss'],
})
export class DespesaListComponent {
  datePipe = new DatePipe('en');
  model = new TableModel();
  findAllSubject = new BehaviorSubject(true);
  findAll$ = this.findAllSubject.pipe(
    switchMap(() =>
      this.despesasService.findAll().pipe(
        map(data => {
          this.model.data = data.map(despesa => [
            new TableItem({
              data: this.datePipe.transform(despesa.data, 'dd/MM/yyyy'),
            }),
            new TableItem({ data: `R$ ${despesa.valor}` }),
            new TableItem({ data: despesa.descricao }),
            new TableItem({ data: despesa.categoriaNome ? despesa.categoriaNome : 'Não informada' }),
            new TableItem({ data: despesa._id }),
          ]);
          return data;
        })
      )
    )
  );
  openExcluirModal = false;

  constructor(
    protected despesasService: DespesasService,
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
    this.router.navigate(['despesas', 'edit', selected[4].data]);
  }

  onExcluirClick(): void {
    const selected = TableUtils.getSelectedItem(this.model);
    this.despesasService.delete(selected[4].data).subscribe(() => {
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
      this.findAllSubject.next(true);
    });
  }
}
