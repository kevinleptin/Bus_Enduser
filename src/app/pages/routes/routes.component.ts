import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  routes: any[] = [];

  constructor(
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this.db.getRoutes();
    let routeSub = this.db.routesSubject.subscribe((list) => {
      if(list.length !== 0) {
        this.routes = list;
        console.log(list);
        
        setTimeout(() => routeSub.unsubscribe(), 1000)
      }
    })
  }

}
