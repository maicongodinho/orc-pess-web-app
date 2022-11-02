import { TableModel } from 'carbon-components-angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CrudListOperations<ModelDb> {
  domain: string;
  title: string;
  description: string;
  model: TableModel;
  findAll$: Observable<ModelDb[]>;
  findAllSubject: BehaviorSubject<boolean>;
  onEditarClick(): void;
  onExcluirClick(): void;
}
