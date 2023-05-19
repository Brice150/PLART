import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { User } from 'src/app/core/interfaces/user';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin.users.component.html',
  styleUrls: ['./admin.users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy{
  users: User[]=[];
  getUserSubscription!: Subscription;
  deleteUserSubscription!: Subscription;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService) {}
  
  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.getUserSubscription && this.getUserSubscription.unsubscribe();
    this.deleteUserSubscription && this.deleteUserSubscription.unsubscribe();
  }

  getUsers() {
    this.getUserSubscription = this.adminService.getAllUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  deleteUser(email: string) {
    this.deleteUserSubscription = this.adminService.deleteUser(email).subscribe({
      next: (response: void) => {
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("User deleted", "User", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  openDialog(email: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(email);
      }
    })
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
