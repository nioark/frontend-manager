import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RegistrosComponent } from './pages/registros/registros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';


const url = environment.url;

const routes: Routes = [
  { path: url + '/dashboard', component: DashboardComponent },
  { path: url + '/servidores', component: ServidoresComponent },
  { path: url + '/login', component: LoginComponent },
  { path: url + '/clientes', component: ClientesComponent},
  { path: url + '/usuarios', component: UsuariosComponent},
  { path: url + '/registros', component: RegistrosComponent},
  { path: url + '/registro/:id', component: RegistrosComponent},
  { path: url + '/config', component: ProfileConfigComponent},
  { path: '**', redirectTo: url + '/dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
