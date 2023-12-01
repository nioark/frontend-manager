import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { Cargo } from 'src/app/models/cargos';
import { Observable } from 'rxjs/internal/Observable';
import { CargosService } from '../../usuarios/services/cargos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() selected$: number | undefined;
  name: string | undefined;
  cargos$?: Observable<Cargo[] | undefined>
  cargos: Cargo[] | undefined;

  isAdmin: boolean = false;


  constructor(private _router: Router, private _loginSrv: LoginService, private _cargosSrv : CargosService) {
   }

  ngOnInit(): void {
    this.cargos$ = this._cargosSrv.fetch();
    this.cargos$?.subscribe((dataCargos: Cargo[] | undefined) => {
      this.cargos = dataCargos
      this.getIsAdmin()
    })

    this.name = this._loginSrv.getName()
  }

  goToPath(path: string) {
    this._router.navigate([path])
  }

  logout(){
    this._loginSrv.logout()
    this._router.navigate(['/login'])
  }

  getIsAdmin(){
    const data = this._loginSrv.retrieveData()
    const cargoId = data.cargo_id
    const cargo = this.cargos?.find(cargo => cargo.id === cargoId) as any

    if (cargo){

      if (cargo.permission_level == 1)
        this.isAdmin = true

      console.log(cargo, this.isAdmin, cargo.permission_level )
    }
    // return cargo?.permissao_level == 1;
  }

}
