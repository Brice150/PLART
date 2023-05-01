import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { Message } from '../core/interfaces/message';
import { User } from '../core/interfaces/user';
import { MessageService } from '../core/services/message.service';
import { UserService } from '..//core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy{
  loggedInUserEmail!: string | null;
  isConnected!: boolean;
  loggedInUser!: User | null;
  users: User[]=[];
  messages: Message[] = [];
  selectedUser!: User | null;
  messageForm!: FormGroup;
  isModifying: boolean = false;
  updatedMessage!: Message | null;
  getUsersSubscription!: Subscription;
  getLoggedInUserSubscription!: Subscription;
  sendMessageSubscription!: Subscription;
  updateMessageSubscription!: Subscription;
  deleteMessageSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(5)]]
    })

    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    }
    else {
      this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail') || '{}');
      this.isConnected = true;
    }

    this.getLoggedInUser();
    this.getUsers();
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
    this.getLoggedInUserSubscription && this.getLoggedInUserSubscription.unsubscribe();
    this.sendMessageSubscription && this.sendMessageSubscription.unsubscribe();
    this.updateMessageSubscription && this.updateMessageSubscription.unsubscribe();
    this.deleteMessageSubscription && this.deleteMessageSubscription.unsubscribe();
  }

  activeUser(user: User) {
    this.selectedUser = user;
    this.getMessages(user);
  }

  getUsers() {
    this.users = [];
    this.getUsersSubscription = this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        for (let user of response) {
          if (user.email !== this.loggedInUserEmail) {
              this.users.push(user);
              if (this.selectedUser != null && this.selectedUser.email === user.email) {
                this.activeUser(user);
              }
          }
        }
        if (!this.selectedUser) {
          this.activeUser(this.users[0]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getLoggedInUser() {
    this.getLoggedInUserSubscription = this.userService.getConnectedUser().subscribe({
      next: (response: User) => {
        this.loggedInUser = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getMessages(user: User) {
    this.messages = [];
    if (this.loggedInUser!.messagesReceived.length !== 0) {
      for (let message of this.loggedInUser!.messagesReceived) {
        if (user.nickname === message.fromUser) {
          this.messages.push(message);
        }
      }
    }
    if (this.loggedInUser!.messagesSended.length !== 0) {
      for (let message of this.loggedInUser!.messagesSended) {
        if (user.nickname === message.toUser) {
          this.messages.push(message);
        }
      }
    }
    this.messages.sort((a, b) => a.date.toString().localeCompare(b.date.toString()));
  }

  getMessagesNumber(user: User): number {
    let count: number = 0;
    if (this.loggedInUser!.messagesReceived.length !== 0) {
      for (let message of this.loggedInUser!.messagesReceived) {
        if (user.nickname === message.fromUser) {
          count++;
        }
      }
    }
    if (this.loggedInUser!.messagesSended.length !== 0) {
      for (let message of this.loggedInUser!.messagesSended) {
        if (user.nickname === message.toUser) {
          count++;
        }
      }
    }
    return count;
  }

  sendMessage(message: Message) {
    message.fkReceiver={"id":this.selectedUser?.id};
    message.fkSender={"id":this.loggedInUser?.id};
    message.fromUser=this.loggedInUser?.nickname!;
    message.toUser=this.selectedUser?.nickname!;    
    this.sendMessageSubscription = this.messageService.addMessage(message).subscribe({
      next: (response: Message) => {
        this.messageForm.get("content")?.reset();
        this.getUsers();
        this.getLoggedInUser();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Message sent", "Message", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  modifyMessage(message: Message) {
    this.updatedMessage = message;
    this.isModifying = true;
  }

  unmodifyMessage() {
    this.messageForm.get("content")?.reset();
    this.updatedMessage = null;
    this.isModifying = false;
  }

  updateMessage(message: Message) {
    message.id=this.updatedMessage?.id!;
    message.fkReceiver={"id":this.selectedUser?.id};
    message.fkSender={"id":this.loggedInUser?.id};
    message.fromUser=this.loggedInUser?.nickname!;
    message.toUser=this.selectedUser?.nickname!;
    message.date=this.updatedMessage?.date!;   
    this.updateMessageSubscription = this.messageService.updateMessage(message).subscribe({
      next: (response: Message) => {
        this.unmodifyMessage();
        this.getUsers();
        this.getLoggedInUser();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Message updated", "Message", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  deleteMessage(message: Message) {
    this.deleteMessageSubscription = this.messageService.deleteMessage(message.id).subscribe({
      next: (response: void) => {
        this.getUsers();
        this.getLoggedInUser();
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

  openDialog(message: Message) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessage(message);
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
