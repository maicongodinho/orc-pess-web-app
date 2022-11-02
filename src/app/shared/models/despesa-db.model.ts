import { DbModel } from './db-model.model';

export interface DespesaDb extends DbModel {
  data: Date;
  valor: number;
  descricao: string;
  usuarioId: string;
  categoriaId: string;
  categoriaNome: string;
}
