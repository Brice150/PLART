import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class AppComponentMessages implements OnInit{
  loggedInUserEmail!: string | null;
  isConnected!: boolean;
  loggedInUser!: User | null;
  users: User[]=[];
  messages: Message[] = [];
  selectedUser!: User | null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    }
    else {
      this.loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUserEmail') || '{}');
      this.isConnected = true;
    }

    this.getLoggedInUser();
    this.getUsers();
  }

  activeUser(user: User) {
    this.selectedUser = user;
    this.getMessages(user);
  }

  getUsers() {
    this.users = [];
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        for (let user of response) {
          if (user.email !== this.loggedInUserEmail) {
              this.users.push(user);
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  getLoggedInUser() {
    this.userService.findUserByEmail(this.loggedInUserEmail!).subscribe(
      (response: User) => {
        this.loggedInUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getMessages(user: User) {
    this.messages = [];
    if (user.messagesReceived.length !== 0) {
      for (let message of user.messagesReceived) {
        if (message.toUser === user?.nickname) {
          this.messages.push(message);
        }
      }
    }
    if (user.messagesReceived.length !== 0) {
      for (let message of user.messagesSended) {
        if (message.fromUser === user?.nickname) {
          this.messages.push(message);
        }
      }
    }
  }
}
