import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'servidores', component: ServidoresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'historico', component: HistoricoComponent},
  { path: 'config', component: ProfileConfigComponent},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
