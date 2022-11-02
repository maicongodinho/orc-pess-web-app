import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartData } from '../models/chart-data.mode';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(protected http: HttpClient) {}

  despesasReceitas(startDate: Date, endDate: Date): Observable<ChartData[]> {
    return this.http.post<ChartData[]>(environment.api + '/dashboard/despesas-receitas', {
      startDate: startDate,
      endDate: endDate,
    });
  }

  evolucao(startDate: Date, endDate: Date): Observable<ChartData[]> {
    return this.http.post<ChartData[]>(environment.api + '/dashboard/evolucao', {
      startDate: startDate,
      endDate: endDate,
    });
  }

  despesasPorCategoria(startDate: Date, endDate: Date): Observable<ChartData[]> {
    return this.http.post<ChartData[]>(environment.api + '/dashboard/despesas-por-categoria', {
      startDate: startDate,
      endDate: endDate,
    });
  }

  receitasPorCategoria(startDate: Date, endDate: Date): Observable<ChartData[]> {
    return this.http.post<ChartData[]>(environment.api + '/dashboard/receitas-por-categoria', {
      startDate: startDate,
      endDate: endDate,
    });
  }
}
