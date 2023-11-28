import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() selected$: number | undefined;

  constructor(private _router: Router) {
   }

  ngOnInit(): void {
  }

  goToPath(path: string) {
    this._router.navigate([path])
  }

}
