import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  imagePath: string = environment.imagePath;
  loggedInUserEmail!: string | null;
  isConnected!: boolean;
  isAdmin!: boolean;

  ngOnInit() {
    let btn : any = document.querySelector("#btn");
    let sidebar: any = document.querySelector(".sidebar");

    btn.onclick = function () {
      sidebar.classList.toggle("active");
    }

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
