import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitaAddComponent } from './receita-add/receita-add.component';
import { ReceitaEditComponent } from './receita-edit/receita-edit.component';
import { ReceitaListComponent } from './receita-list/receita-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReceitaListComponent,
  },
  {
    path: 'add',
    component: ReceitaAddComponent,
  },
  {
    path: 'edit/:id',
    component: ReceitaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceitasRoutingModule {}
