import { Observable } from 'rxjs';

export interface CrudOperations<ModelDb, Model> {
  save(t: Model): Observable<ModelDb>;
  update(id: string, t: Model): Observable<ModelDb>;
  findOne(id: string): Observable<ModelDb>;
  findAll(): Observable<ModelDb[]>;
  delete(id: string): Observable<ModelDb>;
}
