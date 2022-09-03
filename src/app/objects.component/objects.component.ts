import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class AppComponentObjects implements OnInit{
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
