import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponentDialog } from 'src/app/dialog.component/dialog.component';
import { Object } from 'src/app/models/object';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-admin-objects',
  templateUrl: './admin.objects.component.html',
  styleUrls: ['./admin.objects.component.css']
})
export class AppComponentAdminObjects implements OnInit{
  objects: Object[]=[];

  constructor(
    private objectService: ObjectService,
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
  
  deleteObject(id: number) {
    this.objectService.deleteObject(id).subscribe(
      (response: void) => {
        this.getObjects();
        this.snackBar.open("Content deleted", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(AppComponentDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteObject(id);
      }
    });
  }
}