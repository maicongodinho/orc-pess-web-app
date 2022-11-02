import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesaAddComponent } from './despesa-add/despesa-add.component';
import { DespesaEditComponent } from './despesa-edit/despesa-edit.component';
import { DespesaListComponent } from './despesa-list/despesa-list.component';

const routes: Routes = [
  {
    path: '',
    component: DespesaListComponent,
  },
  {
    path: 'add',
    component: DespesaAddComponent,
  },
  {
    path: 'edit/:id',
    component: DespesaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
