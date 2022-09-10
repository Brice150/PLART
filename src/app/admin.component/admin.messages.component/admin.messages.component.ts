import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponentDialog } from 'src/app/dialog.component/dialog.component';
import { Message } from 'src/app/models/message';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin.messages.component.html',
  styleUrls: ['./admin.messages.component.css']
})
export class AppComponentAdminMessages implements OnInit{
  messages: Message[]=[];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.adminService.getMessages().subscribe(
      (response: Message[]) => {
        this.messages = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  deleteMessage(id: number) {
    this.adminService.deleteMessage(id).subscribe(
      (response: void) => {
        this.getMessages();
        this.snackBar.open("Content deleted", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(AppComponentDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessage(id);
      }
    });
  }

  search(key: string){
    const results: Message[] = [];
    for (const message of this.messages) {
      if (message.content?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(message);
      }
    }
    this.messages = results;
    if (results.length === 0 ||!key) {
      this.getMessages();
    }
  }
}
