import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit, OnDestroy {
  @Input() isConnected!: boolean;
  usersNumber: number = 0;
  creatersNumber: number = 0;
  objectsNumber: number = 0;
  getUsersNumberSubscription!: Subscription;
  getCreatersNumberSubscription!: Subscription;
  getObjectsNumberSubscription!: Subscription;

  constructor(
    private statsService: StatsService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.getUsersNumber();
    this.getCreatersNumber();
    this.getObjectsNumber();
  }

  ngOnDestroy() {
    this.getUsersNumberSubscription && this.getUsersNumberSubscription.unsubscribe();
    this.getCreatersNumberSubscription && this.getCreatersNumberSubscription.unsubscribe();
    this.getObjectsNumberSubscription && this.getObjectsNumberSubscription.unsubscribe();
  }

  getUsersNumber() {
    this.getUsersNumberSubscription = this.statsService.getUsersNumber().subscribe({
      next: (response: number) => {
        this.usersNumber = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getCreatersNumber() {
    this.getCreatersNumberSubscription = this.statsService.getCreatersNumber().subscribe({
      next: (response: number) => {
        this.creatersNumber = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getObjectsNumber() {
    this.getObjectsNumberSubscription = this.statsService.getObjectsNumber().subscribe({
      next: (response: number) => {
        this.objectsNumber = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }
}