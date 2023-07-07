import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from '../base-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) { }

  loginUser(value: {email: string; password: string}) {
    const formData = new FormData();
    formData.append("email", value.email.trim() ?? "");
    formData.append("password", value.password.trim() ?? "");
    
    this.http.post(BaseUrls.getLoginUrl(BaseUrls.USER_GROUPURL), formData)
    .subscribe({
      next: (value: any) => {        
        localStorage.setItem("user", JSON.stringify(value?.user ?? {}));
        setTimeout(() => this.router.navigate(['/'], { replaceUrl: true }), 1000)
        this.toast.success("", "Login Successfull");
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message);
        localStorage.setItem("user", JSON.stringify(null));
        this.toast.warning(error.error.message, "");
      }
    })
  }

  registerUser(values: any) {
    const formData: FormData = new FormData();
    Object.entries(values).forEach(([key, value]: [string, any]) => formData.append(key, value));

    this.http.post(`${BaseUrls.BASE_HREF}/${BaseUrls.USER_GROUPURL}/register`, formData)
    .subscribe({
      next: (value: any) => {  
        localStorage.setItem("user", JSON.stringify(value?.user ?? {}));
        setTimeout(() => this.router.navigate(['/'], { replaceUrl: true }), 2000)
        this.toast.success("", "Registered Successfull");
      },
      error: (error: HttpErrorResponse) => {  
        console.log(error.error.message);
        localStorage.setItem("user", JSON.stringify(null));
        this.toast.warning(error.error.message, "Failed");
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
