import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BaseUrls } from '../base-urls';
// import { Users } from '../models/users';
// import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class DbService {

  routesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  routeStopsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  vehiclesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  feedbacks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  constructor(
    private http: HttpClient
  ) {}
  
  getRoutes() {
    this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.BUS_ROUTES_GROUPURL}/get-all`)
      .subscribe({
        next: (value: any) => {
          this.routesSubject.next(value);
        },
        error: (error) => console.error(error)
      });
  }

  getFeedback(userId: number) {
    this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.FEEDBACK_GROUPURL}/get-user-feedback/${userId}`)
      .subscribe({
        next: (value: any) => {
          this.feedbacks.next(value);
        },
        error: (error) => console.error(error)
      });
  }
}
