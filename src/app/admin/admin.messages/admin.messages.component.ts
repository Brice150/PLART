import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Message } from 'src/app/core/interfaces/message';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin.messages.component.html',
  styleUrls: ['./admin.messages.component.css']
})
export class AdminMessagesComponent implements OnInit, OnDestroy{
  messages: Message[]=[];
  getMessageSubscription!: Subscription;
  deleteMessageSubscription!: Subscription;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.getMessages();
  }

  ngOnDestroy() {
    this.getMessageSubscription && this.getMessageSubscription.unsubscribe();
    this.deleteMessageSubscription && this.deleteMessageSubscription.unsubscribe();
  }

  getMessages() {
    this.getMessageSubscription = this.adminService.getMessages().subscribe({
      next: (response: Message[]) => {
        this.messages = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  deleteMessage(id: number) {
    this.deleteMessageSubscription = this.adminService.deleteMessage(id).subscribe({
      next: (response: void) => {
        this.getMessages();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Message deleted", "Message", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessage(id);
      }
    })
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
