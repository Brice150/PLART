import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Object } from 'src/app/models/object';
import { User } from 'src/app/models/user';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})



export class AppComponentCards implements OnInit {
  imagePath: string = environment.imagePath+"objects/";
  objects: Object[]=[];

  constructor(
    private objectService: ObjectService,
    private userService: UserService) {}

  ngOnInit() {
    this.getObjects();
  }

  getObjects() {
    this.objectService.getObjects().subscribe(
      (response: Object[]) => {
        this.objects=response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  
}