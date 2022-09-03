import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class AppComponentRegister implements OnInit {
  registerForm!: FormGroup;
  onConfirmEmail: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private connectService: ConnectService,
    private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    })
  }

  registerUser(user: User) {
    this.connectService.register(user).subscribe(
      (response: User) => {
        this.onConfirmEmail=true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
