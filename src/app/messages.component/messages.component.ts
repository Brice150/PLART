import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class AppComponentMessages implements OnInit{
  loggedInUserEmail!: string | null;
  isConnected!: boolean;

  ngOnInit() {
    if (localStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    }
    else {
      this.loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUserEmail') || '{}');
      this.isConnected = true;
    }
  }
}
