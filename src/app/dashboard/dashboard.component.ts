import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { pt } from 'date-fns/locale';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ChartData } from '../shared/models/chart-data.mode';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  intervaloCtrl = new FormControl([] as Date[], Validators.required);

  despesasReceitasChartOptions = {
    title: 'Despesas X Receitas (R$)',
    height: '400px',
    theme: 'g100',
    legend: {
      alignment: 'center',
    },
    pie: {
      alignment: 'center',
    },
  };
  despesasReceitasChartData!: ChartData[];
  despesasReceitasSubject = new BehaviorSubject(true);
  despesasReceitas$!: Observable<ChartData[]>;

  evolucaoChartOptions = {
    title: 'Evolução de Despesas/Receitas (R$)',
    theme: 'g100',
    axes: {
      left: {
        stacked: true,
        scaleType: 'linear',
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'time',
        mapsTo: 'date',
      },
    },
    timeScale: {
      localeObject: pt,
    },
    curve: 'curveMonotoneX',
    height: '400px',
  };
  evolucaoChartData!: ChartData[];
  evolucaoSubject = new BehaviorSubject(true);
  evolucao$!: Observable<ChartData[]>;

  despesasPorCategoriaChartOptions = {
    title: 'Despesas por Categoria (R$)',
    height: '400px',
    theme: 'g100',
    legend: {
      alignment: 'center',
    },
    donut: {
      alignment: 'center',
    },
  };
  despesasPorCategoriaChartData!: ChartData[];
  despesasPorCategoriaSubject = new BehaviorSubject(true);
  despesasPorCategoria$!: Observable<ChartData[]>;

  receitasPorCategoriaChartOptions = {
    title: 'Receitas por Categoria (R$)',
    height: '400px',
    theme: 'g100',
    legend: {
      alignment: 'center',
    },
    donut: {
      alignment: 'center',
    },
  };
  receitasPorCategoriaChartData!: ChartData[];
  receitasPorCategoriaSubject = new BehaviorSubject(true);
  receitasPorCategoria$!: Observable<ChartData[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.intervaloCtrl.valueChanges.subscribe(changes => {
      if (changes && changes.length > 1) {
        this.despesasReceitas$ = this.despesasReceitasSubject.pipe(
          switchMap(() =>
            this.dashboardService.despesasReceitas(changes[0], changes[1]).pipe(
              map(data => {
                this.despesasReceitasChartData = data;
                return data;
              })
            )
          )
        );

        this.evolucao$ = this.evolucaoSubject.pipe(
          switchMap(() =>
            this.dashboardService.evolucao(changes[0], changes[1]).pipe(
              map(data => {
                this.evolucaoChartData = data;
                return data;
              })
            )
          )
        );

        this.despesasPorCategoria$ = this.despesasPorCategoriaSubject.pipe(
          switchMap(() =>
            this.dashboardService.despesasPorCategoria(changes[0], changes[1]).pipe(
              map(data => {
                this.despesasPorCategoriaChartData = data;
                return data;
              })
            )
          )
        );

        this.receitasPorCategoria$ = this.receitasPorCategoriaSubject.pipe(
          switchMap(() =>
            this.dashboardService.receitasPorCategoria(changes[0], changes[1]).pipe(
              map(data => {
                this.receitasPorCategoriaChartData = data;
                return data;
              })
            )
          )
        );
      }
    });

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.intervaloCtrl.setValue([firstDay, lastDay]);
  }
}
