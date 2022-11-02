import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaDb } from '../models/receita-db.model';
import { Receita } from '../models/receita.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService extends CrudService<ReceitaDb, Receita> {
  constructor(protected http: HttpClient) {
    super(http, '/receitas');
  }
}
