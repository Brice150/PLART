import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { User } from 'src/app/core/interfaces/user';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin.users.component.html',
  styleUrls: ['./admin.users.component.css']
})
export class AdminUsersComponent implements OnInit{
  users: User[]=[];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {}
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  deleteUser(email: string) {
    this.adminService.deleteUser(email).subscribe(
      (response: void) => {
        this.getUsers();
        this.snackBar.open("Content deleted", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  openDialog(email: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(email);
      }
    });
  }

  search(key: string){
    const results: User[] = [];
    for (const user of this.users) {
      if (user.nickname?.toLowerCase().indexOf(key.toLowerCase())!== -1
      || user.email?.toLowerCase().indexOf(key.toLowerCase())!== -1
      || user.userRole?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 ||!key) {
      this.getUsers();
    }
  }
}
