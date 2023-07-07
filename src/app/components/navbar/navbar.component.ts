import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/routes', title: 'Routes', icon: '', class: '' },
  { path: '/my-passes', title: 'My Passes', icon: '', class: '' },
  { path: '/feedback', title: 'Feedback', icon: '', class: '' },
  // { path: '/categories', title: 'Categories', icon: '', class: '' },
  // { path: '/cars', title: 'Cars', icon:  '', class: '' },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public listTitles: any[] = [];
  public isCollapsed: boolean = true;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }

}
