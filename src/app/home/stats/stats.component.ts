import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {
  @Input() isConnected!: boolean;
  usersNumber: number = 0;
  creatersNumber: number = 0;
  objectsNumber: number = 0;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.getUsersNumber();
    this.getCreatersNumber();
    this.getObjectsNumber();
  }

  getUsersNumber() {
    this.statsService.getUsersNumber().subscribe(
      (response: number) => {
        this.usersNumber = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getCreatersNumber() {
    this.statsService.getCreatersNumber().subscribe(
      (response: number) => {
        this.creatersNumber = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getObjectsNumber() {
    this.statsService.getObjectsNumber().subscribe(
      (response: number) => {
        this.objectsNumber = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}