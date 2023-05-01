import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Message } from 'src/app/core/interfaces/message';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin.messages.component.html',
  styleUrls: ['./admin.messages.component.css']
})
export class AdminMessagesComponent implements OnInit{
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
    const dialogRef = this.dialog.open(DialogComponent);
  
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
