import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/models/cargos';
import { LoginService } from './login.service';
import { CargosService } from '../../usuarios/services/cargos.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _loginSrv: LoginService, private _cargosSrv: CargosService) {
  }

}
