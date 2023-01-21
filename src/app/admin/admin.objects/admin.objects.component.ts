import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Object } from 'src/app/core/interfaces/object';
import { AdminService } from 'src/app/core/services/admin.service';
import { ObjectService } from 'src/app/core/services/object.service';

@Component({
  selector: 'app-admin-objects',
  templateUrl: './admin.objects.component.html',
  styleUrls: ['./admin.objects.component.css']
})
export class AdminObjectsComponent implements OnInit{
  objects: Object[]=[];

  constructor(
    private objectService: ObjectService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getObjects();
  }
  
  getObjects() {
    this.objectService.getObjects().subscribe(
      (response: Object[]) => {
        this.objects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  
  deleteObject(object: Object) {
    this.adminService.deleteObject(object.id).subscribe(
    (response: void) => {
      this.getObjects();
      this.snackBar.open("Content deleted", "Dismiss", {duration: 2000});
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  openDialog(object: Object) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteObject(object);
      }
    });
  }

  search(key: string){
    const results: Object[] = [];
    for (const object of this.objects) {
      if (object.nickname?.toLowerCase().indexOf(key.toLowerCase())!== -1
      || object.name?.toLowerCase().indexOf(key.toLowerCase())!== -1
      || object.category?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(object);
      }
    }
    this.objects = results;
    if (results.length === 0 ||!key) {
      this.getObjects();
    }
  }
}