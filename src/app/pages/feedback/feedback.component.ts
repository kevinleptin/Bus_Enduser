import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from 'src/app/base-urls';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  isLoading: boolean = false;

  feedbacks: any[] = [];
  user: any = JSON.parse(localStorage.getItem("user") ?? '{}')

  feedbackFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private modal: NgbModal,
    private toast: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getFeedback()
  }

  getFeedback() {
    this.db.getFeedback(this.user.userId);
    let routeSub = this.db.feedbacks.subscribe((list) => {
      if(list.length !== 0) {
        this.feedbacks = list;
        console.log(list);
        setTimeout(() => routeSub.unsubscribe(), 1000)
      }
    })
  }

  openConfirmationModal(modalRef: TemplateRef<unknown>, busModel?: any) {
    this.feedbackFormGroup = this.fb.group({
      userId: [this.user.userId],
      userName: [this.user.name],
      isComplaint: [0],
      query: [""],
      remarks: [""]
    });
    this.modal.open(modalRef);
  }

  saveFeedback() {
    let formData = new FormData();
    Object.entries(this.feedbackFormGroup.value).forEach(([key, value]: any) => formData.append(key, value));

    this.http.post(BaseUrls.getAddUrl(BaseUrls.FEEDBACK_GROUPURL), formData)
      .subscribe({
        next: (value: any) => {
          this.toast.success("Feedback Submitted", "");
          this.modal.dismissAll();
          this.getFeedback();
        },
        error: (error) => {
          console.log(error);
          this.toast.error("Something went wrong!! Please try again after sometime")
        },
      })
  }


}
