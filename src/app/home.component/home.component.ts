import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AppComponentHome implements OnInit{
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
