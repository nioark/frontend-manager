import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { Cargo } from 'src/app/models/cargos';
import { Observable } from 'rxjs/internal/Observable';
import { CargosService } from '../../usuarios/services/cargos.service';
import { UserService } from '../../login/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() selected$: number | undefined;
  name: string | undefined;

  isConvidado: boolean = true;
  permission_level: number = -1;


  constructor(private _router: Router, private _loginSrv: LoginService, private _cargosSrv : CargosService) {
   }

  ngOnInit(): void {
    this._cargosSrv.fetch().subscribe((dataCargos: Cargo[]) => {
      const cargoId = this._loginSrv.retrieveData().cargo_id
      const cargo = dataCargos.find(cargo => cargo.id == cargoId) as Cargo
      if (cargo.permission_level != undefined){
        this.permission_level = cargo.permission_level
      }
    });

    this.name = this._loginSrv.getName()
  }

  goToPath(path: string) {
    this._router.navigate([path])
  }

  logout(){
    this._loginSrv.logout()
    this._router.navigate(['/login'])
  }

}
