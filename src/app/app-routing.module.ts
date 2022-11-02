import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from './shared/guards/token.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'dashboard',
    canActivate: [TokenGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'categorias',
    canActivate: [TokenGuard],
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
  },
  {
    path: 'receitas',
    canActivate: [TokenGuard],
    loadChildren: () => import('./receitas/receitas.module').then(m => m.ReceitasModule),
  },
  {
    path: 'despesas',
    canActivate: [TokenGuard],
    loadChildren: () => import('./despesas/despesas.module').then(m => m.DespesasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
