import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './core/interfaces/user';
import { UserService } from './core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  imagePath: string = environment.imagePath;
  isConnected!: boolean;
  isAdmin!: boolean;
  getUserRoleSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let btn: any = document.querySelector('#btn');
    let sidebar: any = document.querySelector('.sidebar');

    btn.onclick = function () {
      sidebar.classList.toggle('active');
    };

    if (sessionStorage.getItem('role') === null) {
      this.isConnected = false;
    } else {
      this.isConnected = true;
      this.getUserRole();
    }
  }

  ngOnDestroy() {
    this.getUserRoleSubscription && this.getUserRoleSubscription.unsubscribe();
  }

  getUserRole() {
    this.getUserRoleSubscription = this.userService
      .getConnectedUser()
      .subscribe({
        next: (response: User) => {
          if (response.userRole === 'ROLE_ADMIN') {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, 'Server error', {
            positionClass: 'toast-bottom-center',
          });
        },
      });
  }
}
