import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class AppComponentRegister implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private connectService: ConnectService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    })
  }

  registerUser(user: User) {
    this.connectService.register(user).subscribe(
      (response: User) => {
        this.snackBar.open("Account created", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
