import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account.delete.component.html',
  styleUrls: ['./account.delete.component.css'],
})
export class AccountDeleteComponent implements OnDestroy, OnInit {
  loggedInUser!: User;
  deleteUserSubscription!: Subscription;
  getLoggedInUserSubscription!: Subscription;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  ngOnDestroy() {
    this.deleteUserSubscription && this.deleteUserSubscription.unsubscribe();
    this.getLoggedInUserSubscription &&
      this.getLoggedInUserSubscription.unsubscribe();
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

  deleteUser() {
    this.deleteUserSubscription = this.userService
      .deleteUser(this.loggedInUser.email)
      .subscribe({
        next: (response: void) => {
          this.logout();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
        complete: () => {
          this.toastr.success('Account deleted', 'User', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  logout() {
    sessionStorage.removeItem('role');
    this.router.navigate(['/connect']).then(() => {
      window.location.reload();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser();
      }
    });
  }
}
