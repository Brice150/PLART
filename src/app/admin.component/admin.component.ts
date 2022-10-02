import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AppComponentAdmin implements OnInit{
  loggedInUserEmail!: string | null;
  isConnected!: boolean;
  activeObjects: boolean = false;
  activeUsers: boolean = true;
  activeMessages: boolean = false;

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    }
    else {
      this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail') || '{}');
      this.isConnected = true;
    }
  }

  onObjects() {
    this.activeObjects = true;
    this.activeUsers = false;
    this.activeMessages = false;
  }
  
  onUsers() {
    this.activeObjects = false;
    this.activeUsers = true;
    this.activeMessages = false;
  }

  onMessages() {
    this.activeObjects = false;
    this.activeUsers = false;
    this.activeMessages = true;
  }
}
