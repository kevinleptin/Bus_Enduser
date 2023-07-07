import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from 'src/app/base-urls';

@Component({
  selector: 'app-route-detailed',
  templateUrl: './route-detailed.component.html',
  styleUrls: ['./route-detailed.component.scss']
})
export class RouteDetailedComponent implements OnInit {

  routeModel: any;
  busList: any[] = [];
  stopsList: any[] = [];

  vehicleTypes: string[] = ["Mini Bus", "Shuttle Bus", "Coach Bus", "Hybrid Bus", "Single-Decker Bus", "Double-Decker Bus",];
  user: any = JSON.parse(localStorage.getItem("user") ?? '{}')

  selectedModal: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private toast: ToastrService
  ) {
    this.route.params.subscribe((value: any) => {
      if(value.routeId !== undefined) {
        this.getData(value.routeId)
      }
    })
  }

  ngOnInit(): void {
  }

  getData(routerId: number) {
    Promise.all([
      this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.ROUTE_STOPS_GROUPURL}/get-route-stops?routeId=${routerId}`).toPromise(),
      this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.VEHICLES_GROUPURL}/get-route-vehicles?routeId=${routerId}`).toPromise(),
      this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.BUS_ROUTES_GROUPURL}/get/${routerId}`).toPromise(),
    ]).then(([stops, buses, routeModel]: any) => {
      this.stopsList = stops;
      this.busList = buses;
      this.routeModel = { ...routeModel };
    }, (error) => console.error(error));
  }

  openConfirmationModal(modalRef: TemplateRef<unknown>, busModel: any) {
    this.selectedModal = {
      userId: this.user.userId,
      userName: this.user.name,
      busRouteId: this.routeModel.routeId,
      routeName: this.routeModel.title,
      busRegNumber: busModel.registrationNumber,
      vehicleId: busModel.vehicleId,
      busType: busModel.type,
      price: busModel.pricePerSeat,
      status: 1,
    };
    this.modal.open(modalRef);
  }

  saveBusPass() {
    let formData = new FormData();
    Object.entries(this.selectedModal).forEach(([key, value]: any) => formData.append(key, value));

    this.http.post(BaseUrls.getAddUrl(BaseUrls.BUS_PASS_GROUPURL), formData)
      .subscribe({
        next: (value) => {
          this.toast.success("Request Generated Successfully for bus pass", "");
          this.modal.dismissAll();
        },
        error: (error) => {
          console.log(error);
          this.toast.error(error.error ?? "Something went wrong")
        },
      })
  }
}
