import { NgModule } from '@angular/core';

import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesaAddComponent } from './despesa-add/despesa-add.component';
import { DespesaEditComponent } from './despesa-edit/despesa-edit.component';
import { SharedModule } from '../shared/shared.module';
import { DespesaListComponent } from './despesa-list/despesa-list.component';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [DespesaAddComponent, DespesaEditComponent, DespesaListComponent],
  imports: [SharedModule, DespesasRoutingModule, NgxMaskModule.forChild()],
})
export class DespesasModule {}
