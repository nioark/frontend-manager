import { UsuarioAction } from 'src/app/models/usuario';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './pages/login/components/login-form/login-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule}  from '@angular/material/progress-bar';
import { LoginComponent } from './pages/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { CountUpDirective } from './count-up.directive';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditServidorComponent } from './pages/servidores/components/editServidor/editServidor.component';
import { AddServidorComponent } from './pages/servidores/components/addServidor/addServidor.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ViewServidorComponent } from './pages/servidores/components/viewServidor/viewServidor.component';
import { ViewClienteComponent } from './pages/clientes/components/viewCliente/viewCliente.component';
import { RegistrosComponent } from './pages/registros/registros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AddUsuarioComponent } from './pages/usuarios/components/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './pages/usuarios/components/edit-usuario/edit-usuario.component';
import { DeleteServidorComponent } from './pages/servidores/components/deleteServidor/deleteServidor.component';
import { DeleteUsuarioComponent } from './pages/usuarios/components/delete-usuario/delete-usuario.component';

import { InterceptorModule } from './interceptor/interceptor.module';
import {MatMenuModule} from '@angular/material/menu';
import { CommentEditComponent } from './pages/servidores/components/commentEdit/commentEdit.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';
import { NewTokenComponent } from './pages/servidores/components/new-token/new-token.component';
import { ViewRegistroUsuarioComponent } from './pages/registros/view-registro-usuario/view-registro-usuario.component';
import { ViewRegistroServidorComponent } from './pages/registros/view-registro-servidor/view-registro-servidor.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    LoginFormComponent,
    LoginComponent,
    ServidoresComponent,
    EditServidorComponent,
    AddServidorComponent,
    ViewServidorComponent,
    CommentEditComponent,
    ViewClienteComponent,
    ClientesComponent,
    RegistrosComponent,
    UsuariosComponent,
    EditUsuarioComponent,
    AddUsuarioComponent,
    DeleteUsuarioComponent,
    ViewRegistroServidorComponent,
    ViewRegistroUsuarioComponent,
    DeleteServidorComponent,
    ProfileConfigComponent,
    CountUpDirective,
    NewTokenComponent,
  ],
  imports: [
    GoogleChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    InterceptorModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
