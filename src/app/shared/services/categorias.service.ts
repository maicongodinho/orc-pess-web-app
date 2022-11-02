import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaDb } from '../models/categoria-db.model';
import { Categoria } from '../models/categoria.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService extends CrudService<CategoriaDb, Categoria> {
  constructor(protected http: HttpClient) {
    super(http, '/categorias');
  }
}
