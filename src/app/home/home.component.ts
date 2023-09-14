import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isConnected!: boolean;

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserEmail') === null) {
      this.isConnected = false;
    } else {
      this.isConnected = true;
    }
  }
}
