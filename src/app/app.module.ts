import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './components/login-form/login-form.component';
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
import { EditServidorComponent } from './components/editServidor/editServidor.component';
import { AddServidorComponent } from './components/addServidor/addServidor.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ViewServidorComponent } from './components/viewServidor/viewServidor.component';
import { ViewClienteComponent } from './components/viewCliente/viewCliente.component';


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
    ViewClienteComponent,
    ClientesComponent,
    CountUpDirective
  ],
  imports: [
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
