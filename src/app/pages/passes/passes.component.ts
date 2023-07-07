import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from 'src/app/base-urls';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.scss']
})
export class PassesComponent implements OnInit {
  vehicleTypes: string[] = ["Mini Bus", "Shuttle Bus", "Coach Bus", "Hybrid Bus", "Single-Decker Bus", "Double-Decker Bus",];
  user: any = JSON.parse(localStorage.getItem("user") ?? '{}');
  
  selectedPassId: any;
  passStatus!: number;
  passes: any[] = [];

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.BUS_PASS_GROUPURL}/get-user-passes/${this.user.userId}`)
      .subscribe({
        next: (value: any) => {
          this.passes = value;
        },
        error: (error) => {
          console.log(error);
          
        }
      });
  }

  openConfirmationModal(modalRef: TemplateRef<unknown>, pass: any, status: any) {
    this.selectedPassId = pass.busPassId;
    this.passStatus = status;
    this.modal.open(modalRef);
  }

  updateStatus() {
    this.http.get(`${BaseUrls.BASE_HREF}/${BaseUrls.BUS_PASS_GROUPURL}/update-status?busPassId=${this.selectedPassId}&status=${this.passStatus}`)
      .subscribe((value) => {
        this.toast.success("Success");
        this.modal.dismissAll();
      }, (error) => {
        console.log(error);
        this.toast.error("Something went wrong!!")
      })
  }
}
