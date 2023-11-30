import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() selected$: number | undefined;
  name: string | undefined;


  constructor(private _router: Router, private _loginSrv: LoginService) {
   }

  ngOnInit(): void {
    this.name = this._loginSrv.getName()
  }

  goToPath(path: string) {
    this._router.navigate([path])
  }

}
