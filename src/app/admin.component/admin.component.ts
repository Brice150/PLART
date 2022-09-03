import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AppComponentAdmin implements OnInit{
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
