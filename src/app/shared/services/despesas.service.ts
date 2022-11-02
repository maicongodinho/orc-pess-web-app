import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DespesaDb } from '../models/despesa-db.model';
import { Despesa } from '../models/despesa.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class DespesasService extends CrudService<DespesaDb, Despesa> {
  constructor(protected http: HttpClient) {
    super(http, '/despesas');
  }
}
