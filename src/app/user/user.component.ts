import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  isConnected!: boolean;
  isModifying: boolean = true;
  isModifyingObjects: boolean = false;
  isSeeingObjects: boolean = true;
  isAddingObjects: boolean =false;

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserEmail')===null) {
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
    }
  }

  onModify() {
    this.isModifying = true;
  }
  
  onDelete() {
    this.isModifying = false;
  }

  onObjectModify() {
    this.isModifyingObjects = true;
    this.isSeeingObjects = false;
    this.isAddingObjects = false;
  }
  
  onObject() {
    this.isModifyingObjects = false;
    this.isSeeingObjects = true;
    this.isAddingObjects = false;
  }

  onObjectAdd() {
    this.isModifyingObjects = false;
    this.isSeeingObjects = false;
    this.isAddingObjects = true;
  }
}