import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css'],
})
export class ObjectsComponent implements OnInit {
  isConnected!: boolean;

  ngOnInit() {
    if (sessionStorage.getItem('role') === null) {
      this.isConnected = false;
    } else {
      this.isConnected = true;
    }
  }
}
