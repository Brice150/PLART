import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-modify',
  templateUrl: './account.modify.component.html',
  styleUrls: ['./account.modify.component.css']
})
export class AppComponentAccountModify implements OnInit{
  @Input() loggedInUserEmail!: string | null;
  loggedInUser!: User | null;
  updateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      id: [''],
      userRole: [''],
      enabled: [''],
      locked: [''],
      nickname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    })

    this.getLoggedInUser();
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        this.snackBar.open("Content updated", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getLoggedInUser() {
    this.userService.findUserByEmail(this.loggedInUserEmail!).subscribe(
      (response: User) => {
        this.loggedInUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
