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
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  loggedInUserEmail!: string | null;
  isConnected!: boolean;
  loggedInUser!: User | null;
  users: User[] = [];
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
  getUserMessagesNumberSubscription!: Subscription;
  getSelectedUserMessagesSubscription!: Subscription;
  getMessageSenderSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.messageForm = this.fb.group({
      content: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5),
        ],
      ],
    });

    if (sessionStorage.getItem('loggedInUserEmail') === null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    } else {
      this.loggedInUserEmail = JSON.parse(
        sessionStorage.getItem('loggedInUserEmail') || '{}'
      );
      this.isConnected = true;
    }

    this.getLoggedInUser();
    this.getUsers();
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
    this.getLoggedInUserSubscription &&
      this.getLoggedInUserSubscription.unsubscribe();
    this.sendMessageSubscription && this.sendMessageSubscription.unsubscribe();
    this.updateMessageSubscription &&
      this.updateMessageSubscription.unsubscribe();
    this.deleteMessageSubscription &&
      this.deleteMessageSubscription.unsubscribe();
    this.getUserMessagesNumberSubscription &&
      this.getUserMessagesNumberSubscription.unsubscribe();
    this.getSelectedUserMessagesSubscription &&
      this.getSelectedUserMessagesSubscription.unsubscribe();
    this.getMessageSenderSubscription &&
      this.getMessageSenderSubscription.unsubscribe();
  }

  getUsers() {
    this.getUsersSubscription = this.userService.getAllUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        if (this.users.length !== 0 && !this.selectedUser) {
          this.selectedUser = this.users[0];
        }
        this.getSelectedUserMessages(this.selectedUser!);
        for (let user of this.users) {
          this.getUserMessagesNumber(user);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, 'Server error', {
          positionClass: 'toast-bottom-center',
        });
      },
    });
  }

  getUserMessagesNumber(user: User) {
    this.getUserMessagesNumberSubscription = this.messageService
      .getUserMessagesNumber(user.id)
      .subscribe({
        next: (response: number) => {
          user.messagesNumber = response;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  getSelectedUserMessages(user: User) {
    this.getSelectedUserMessagesSubscription = this.messageService
      .getAllUserMessages(user.id)
      .subscribe({
        next: (response: Message[]) => {
          this.messages = response;
          for (let message of this.messages) {
            this.getMessageSender(message);
          }
          this.selectedUser = user;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  getMessageSender(message: Message) {
    this.getMessageSenderSubscription = this.messageService
      .getMessageSender(message.id)
      .subscribe({
        next: (response: User) => {
          message.sender = response.nickname;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
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

  isToday(message: Message): boolean {
    let today: Date = new Date();
    let messageDate: Date = new Date(message.date);
    let isToday: boolean =
      messageDate.getFullYear() === today.getFullYear() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getDate() === today.getDate();
    return isToday;
  }

  sendMessage(message: Message) {
    message.fkReceiver = { id: this.selectedUser?.id };
    message.fkSender = { id: this.loggedInUser?.id };
    this.sendMessageSubscription = this.messageService
      .addMessage(message)
      .subscribe({
        next: (response: Message) => {
          this.messageForm.get('content')?.reset();
          this.getUsers();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
        complete: () => {
          this.toastr.success('Message sent', 'Message', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  modifyMessage(message: Message) {
    this.updatedMessage = message;
    this.isModifying = true;
  }

  unmodifyMessage() {
    this.messageForm.get('content')?.reset();
    this.updatedMessage = null;
    this.isModifying = false;
  }

  updateMessage(message: Message) {
    message.id = this.updatedMessage?.id!;
    message.fkReceiver = { id: this.selectedUser?.id };
    message.fkSender = { id: this.loggedInUser?.id };
    message.date = this.updatedMessage?.date!;
    this.updateMessageSubscription = this.messageService
      .updateMessage(message)
      .subscribe({
        next: (response: Message) => {
          this.unmodifyMessage();
          this.getUsers();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
        complete: () => {
          this.toastr.success('Message updated', 'Message', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  deleteMessage(message: Message) {
    this.deleteMessageSubscription = this.messageService
      .deleteMessage(message.id)
      .subscribe({
        next: (response: void) => {
          this.getUsers();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
        complete: () => {
          this.toastr.success('Message deleted', 'Message', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }

  openDialog(message: Message) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMessage(message);
      }
    });
  }

  search(key: string) {
    const results: User[] = [];
    for (const user of this.users) {
      if (
        user.nickname?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.userRole?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }
}
