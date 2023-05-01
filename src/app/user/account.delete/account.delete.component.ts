import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account.delete.component.html',
  styleUrls: ['./account.delete.component.css']
})
export class AccountDeleteComponent implements OnInit, OnDestroy{
  loggedInUserEmail: string | null = null;
  deleteUserSubscription!: Subscription;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
    }
    else {
      this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail') || '{}');
    }
  }

  ngOnDestroy() {
    this.deleteUserSubscription && this.deleteUserSubscription.unsubscribe();
  }

  deleteUser() {
    this.deleteUserSubscription = this.userService.deleteUser(this.loggedInUserEmail!).subscribe({
      next: (response: void) => {
        this.logout();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Account deleted", "User", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  logout() {
    sessionStorage.removeItem('loggedInUserEmail');
    this.router.navigate(['/connect'])
    .then(() => {
      window.location.reload();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    })
  }
}
