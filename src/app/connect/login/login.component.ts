import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/interfaces/user';
import { ConnectService } from 'src/app/core/services/connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm!: FormGroup;
  invalidLogin: boolean = false;
  loginSubscription!: Subscription;
  
  constructor(
    private fb: FormBuilder, 
    private connectService: ConnectService,
    private router: Router,
    private toastr: ToastrService) {}

    ngOnInit() {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
      })
    }

    ngOnDestroy() {
      this.loginSubscription && this.loginSubscription.unsubscribe();
    }

    loginUser(user: User) {
      this.loginSubscription = this.connectService.login(user).subscribe({
        next: (response: any) => {
          sessionStorage.setItem('loggedInUserEmail', JSON.stringify(user.email));
          this.router.navigate(['/user'])
          .then(() => {
            window.location.reload();
          })
        },
        error: (error: HttpErrorResponse) => {
          this.invalidLogin = true;
          if (error.error.includes("Bad credentials")) {
            this.toastr.error("Wrong email or password !", "Connection error", {
              positionClass: "toast-bottom-center" 
            })
          }
          else if (error.error.includes("User is disabled")) {
            this.toastr.warning("Please confirm your email before login", "Email not confirmed", {
              positionClass: "toast-bottom-center" 
            })
          }
          setTimeout(() => {
            this.invalidLogin = false;
          }, 2000)
        },
        complete: () => {
          this.toastr.success("Logged in !", "Connection", {
            positionClass: "toast-bottom-center" 
          })
        }
      })
    }
}
