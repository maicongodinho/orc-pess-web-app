import { DbModel } from './db-model.model';

export interface CategoriaDb extends DbModel {
  nome: string;
  descricao: string;
}
