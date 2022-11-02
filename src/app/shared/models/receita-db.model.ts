import { DbModel } from './db-model.model';

export interface ReceitaDb extends DbModel {
  data: string;
  valor: number;
  descricao: string;
  usuarioId: string;
  categoriaId: string;
  categoriaNome: string;
}
