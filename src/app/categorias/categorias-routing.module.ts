import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaListComponent,
  },
  {
    path: 'add',
    component: CategoriaAddComponent,
  },
  {
    path: 'edit/:id',
    component: CategoriaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
