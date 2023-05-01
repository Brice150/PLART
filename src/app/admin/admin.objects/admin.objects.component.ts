import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Object } from 'src/app/core/interfaces/object';
import { AdminService } from 'src/app/core/services/admin.service';
import { ObjectService } from 'src/app/core/services/object.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-objects',
  templateUrl: './admin.objects.component.html',
  styleUrls: ['./admin.objects.component.css']
})
export class AdminObjectsComponent implements OnInit, OnDestroy{
  objects: Object[]=[];
  getObjectSubscription!: Subscription;
  deleteObjectSubscription!: Subscription;

  constructor(
    private objectService: ObjectService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.getObjects();
  }

  ngOnDestroy() {
    this.getObjectSubscription && this.getObjectSubscription.unsubscribe();
    this.deleteObjectSubscription && this.deleteObjectSubscription.unsubscribe();
  }
  
  getObjects() {
    this.getObjectSubscription = this.objectService.getObjects().subscribe({
      next: (response: Object[]) => {
        this.objects = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }
  
  deleteObject(object: Object) {
    this.deleteObjectSubscription = this.adminService.deleteObject(object.id).subscribe({
      next: (response: void) => {
        this.getObjects();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Object deleted", "Object", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  openDialog(object: Object) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteObject(object);
      }
    })
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