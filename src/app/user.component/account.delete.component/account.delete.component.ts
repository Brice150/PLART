import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponentDialog } from 'src/app/dialog.component/dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account.delete.component.html',
  styleUrls: ['./account.delete.component.css']
})
export class AppComponentAccountDelete{
  @Input() loggedInUserEmail!: string | null;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  deleteUser() {
    this.userService.deleteUser(this.loggedInUserEmail!).subscribe(
      (response: void) => {
        localStorage.removeItem('loggedInUserEmail');
        this.router.navigate(['/connect'])
        .then(() => {
        window.location.reload();
      });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }
}
