import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { Cargo } from 'src/app/models/cargos';
import { Observable } from 'rxjs/internal/Observable';
import { CargosService } from '../../usuarios/services/cargos.service';
import { ThemeService } from '../../profile-config/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() selected$: number | undefined;
  name: string | undefined;

  permission_level: number = -1;

  public cargos$?: Observable<Cargo[] | undefined>;

  constructor(private _router: Router, private _themeSrv : ThemeService, private _loginSrv: LoginService, private _cargosSrv : CargosService) {}

  changeTheme(){
    this._themeSrv.nextTheme();
  }

  ngAfterContentInit(): void {
    this._themeSrv.setTheme();
    if (localStorage.getItem('permission_level') == undefined){
      this.cargos$ = this._cargosSrv.fetch()

      this.cargos$.subscribe((dataCargos: Cargo[] | undefined) => {
        const cargoId = this._loginSrv.retrieveData().cargo_id
        const cargo = dataCargos?.find(cargo => cargo.id == cargoId) as Cargo
        if (cargo.permission_level != undefined){
          this.permission_level = cargo.permission_level
        }

        localStorage.setItem('permission_level', this.permission_level.toString())
      });
    }
    else {
      this.permission_level = parseInt(localStorage.getItem('permission_level') as string)
    }


  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

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
