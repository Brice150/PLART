import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/interfaces/user';
import { ConnectService } from 'src/app/core/services/connect.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  successfulRegistration: boolean = false;
  registerSubscription!: Subscription;

  constructor(
    private fb: FormBuilder, 
    private connectService: ConnectService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    })
  }

  ngOnDestroy() {
    this.registerSubscription && this.registerSubscription.unsubscribe();
  }

  registerUser(user: User) {
    this.registerSubscription = this.connectService.register(user).subscribe({
      next: (response: User) => {
        this.successfulRegistration = true;
      },
      error: (error: HttpErrorResponse) => {        
        this.toastr.error(error.error, "Connection", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Registration successful", "Connection", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }
  
}
