import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './core/interfaces/user';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  imagePath: string = environment.imagePath;
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
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
      this.getUserRole();
    }

  }

  getUserRole() {
    this.userService.getConnectedUser().subscribe(
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
