import { NgModule } from '@angular/core';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

@NgModule({
  declarations: [CategoriaAddComponent, CategoriaEditComponent, CategoriaListComponent],
  imports: [SharedModule, CategoriasRoutingModule],
})
export class CategoriasModule {}
