import { NgModule } from '@angular/core';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ReceitaAddComponent } from './receita-add/receita-add.component';
import { ReceitaEditComponent } from './receita-edit/receita-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ReceitaListComponent } from './receita-list/receita-list.component';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ReceitaAddComponent, ReceitaEditComponent, ReceitaListComponent],
  imports: [SharedModule, ReceitasRoutingModule, NgxMaskModule.forChild()],
})
export class ReceitasModule {}
