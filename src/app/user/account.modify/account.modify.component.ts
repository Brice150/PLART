import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-account-modify',
  templateUrl: './account.modify.component.html',
  styleUrls: ['./account.modify.component.css'],
})
export class AccountModifyComponent implements OnInit, OnDestroy {
  loggedInUser!: User | null;
  updateForm!: FormGroup;
  updateUserSubscription!: Subscription;
  getLoggedInUserSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      id: [''],
      userRole: [''],
      enabled: [''],
      locked: [''],
      nickname: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
      ],
    });

    this.getLoggedInUser();
  }

  ngOnDestroy() {
    this.updateUserSubscription && this.updateUserSubscription.unsubscribe();
    this.getLoggedInUserSubscription &&
      this.getLoggedInUserSubscription.unsubscribe();
  }

  updateUser(user: User) {
    this.updateUserSubscription = this.userService.updateUser(user).subscribe({
      next: (response: User) => {
        this.getLoggedInUser();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, 'Server error', {
          positionClass: 'toast-bottom-center',
        });
      },
      complete: () => {
        this.toastr.success('User updated', 'User', {
          positionClass: 'toast-bottom-center',
        });
      },
    });
  }

  getLoggedInUser() {
    this.getLoggedInUserSubscription = this.userService
      .getConnectedUser()
      .subscribe({
        next: (response: User) => {
          this.loggedInUser = response;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }
}
