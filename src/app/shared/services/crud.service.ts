import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudOperations } from '../models/crud-operations.model';

export abstract class CrudService<ModelDb, Model> implements CrudOperations<ModelDb, Model> {
  constructor(protected _http: HttpClient, protected _base: string) {}

  save(t: Model): Observable<ModelDb> {
    return this._http.post<ModelDb>(environment.api + this._base, t);
  }

  update(id: string, t: Model): Observable<ModelDb> {
    return this._http.put<ModelDb>(environment.api + this._base + '/' + id, t, {});
  }

  findOne(id: string): Observable<ModelDb> {
    return this._http.get<ModelDb>(environment.api + this._base + '/' + id);
  }

  findAll(): Observable<ModelDb[]> {
    return this._http.get<ModelDb[]>(environment.api + this._base);
  }

  delete(id: string): Observable<ModelDb> {
    return this._http.delete<ModelDb>(environment.api + this._base + '/' + id);
  }
}
