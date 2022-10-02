import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit() {
    let btn : any = document.querySelector("#btn");
    let sidebar: any = document.querySelector(".sidebar");

    btn.onclick = function () {
      sidebar.classList.toggle("active");
    }

    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.loggedInUserEmail = null;
      this.isConnected = false;
    }
    else {
      this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail') || '{}');
      this.isConnected = true;
      this.getUserRole(this.loggedInUserEmail!);
    }

  }

  getUserRole(email: string) {
    this.userService.findUserByEmail(email).subscribe(
      (response: User) => {
        if (response.userRole === "ROLE_ADMIN") {
          this.isAdmin = true;
        }
        else {
          this.isAdmin = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
