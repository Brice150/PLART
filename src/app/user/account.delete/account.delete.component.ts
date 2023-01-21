import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account.delete.component.html',
  styleUrls: ['./account.delete.component.css']
})
export class AccountDeleteComponent{
  loggedInUserEmail: string | null = null;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
    }
    else {
      this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail') || '{}');
    }
  }

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
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }
}
