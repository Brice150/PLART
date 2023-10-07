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
  isConnected!: boolean;
  loggedInUser!: User | null;
  messages: Message[] = [];
  messageForm!: FormGroup;
  isModifying: boolean = false;
  updatedMessage!: Message | null;
  getMessagesSubscription!: Subscription;
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

    if (sessionStorage.getItem('role') === null) {
      this.isConnected = false;
    } else {
      this.isConnected = true;
    }

    this.getLoggedInUser();
    this.getMessages();
  }

  ngOnDestroy() {
    this.getMessagesSubscription && this.getMessagesSubscription.unsubscribe();
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

  getMessages() {
    this.getMessagesSubscription = this.messageService
      .getAllMessages()
      .subscribe({
        next: (response: Message[]) => {
          this.messages = response;
          for (let message of this.messages) {
            this.getMessageSender(message);
          }
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

  sendMessage(message: Message) {
    message.fkSender = { id: this.loggedInUser?.id };
    this.sendMessageSubscription = this.messageService
      .addMessage(message)
      .subscribe({
        next: (response: Message) => {
          this.messageForm.get('content')?.reset();
          this.getMessages();
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
    message.fkSender = { id: this.loggedInUser?.id };
    message.date = this.updatedMessage?.date!;
    this.updateMessageSubscription = this.messageService
      .updateMessage(message)
      .subscribe({
        next: (response: Message) => {
          this.unmodifyMessage();
          this.getMessages();
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

  deleteMessage(messageId: number) {
    this.deleteMessageSubscription = this.messageService
      .deleteMessage(messageId)
      .subscribe({
        next: (response: void) => {
          this.getMessages();
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

  openDialog(messageId: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMessage(messageId);
      }
    });
  }

  search(key: string) {
    const results: Message[] = [];
    for (const message of this.messages) {
      if (
        message.sender?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        message.content?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(message);
      }
    }
    this.messages = results;
    if (results.length === 0 || !key) {
      this.getMessages();
    }
  }
}
