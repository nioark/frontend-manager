import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'servidores', component: ServidoresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
