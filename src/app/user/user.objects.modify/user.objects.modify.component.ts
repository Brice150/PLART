import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Object } from 'src/app/core/interfaces/object';
import { User } from 'src/app/core/interfaces/user';
import { ObjectService } from 'src/app/core/services/object.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user-objects-modify',
  templateUrl: './user.objects.modify.component.html',
  styleUrls: ['./user.objects.modify.component.css']
})
export class UserObjectsModifyComponent implements OnInit, OnDestroy{
  loggedInUser!: User | null;
  objects: Object[]=[];
  object!: Object | null;
  updateForm!: FormGroup;
  getLoggedInUserSubscription!: Subscription;
  getObjectsSubscription!: Subscription;
  updateObjectSubscription!: Subscription;
  deleteObjectSubscription!: Subscription;

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr:ToastrService) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]]
    })

    this.getLoggedInUser();
    this.getObjects();
  }

  ngOnDestroy() {
    this.getLoggedInUserSubscription && this.getLoggedInUserSubscription.unsubscribe();
    this.getObjectsSubscription && this.getObjectsSubscription.unsubscribe();
    this.updateObjectSubscription && this. updateObjectSubscription.unsubscribe();
    this.deleteObjectSubscription && this.deleteObjectSubscription.unsubscribe();
  }

  getLoggedInUser() {
    this.getLoggedInUserSubscription = this.userService.getConnectedUser().subscribe({
      next: (response: User) => {
        this.loggedInUser = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getObjects() {
    this.getObjectsSubscription = this.userService.getConnectedUser().subscribe({
      next: (response: User) => {
        if (response.objects.length !== 0) {
          this.objects=response.objects!;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  modify(object: Object) {
    this.object=object;
  }

  unmodify() {
    this.object = null;
  }

  updateObject(object: Object) {
    object.id = this.object?.id!;
    object.fileToDownload = this.object?.fileToDownload!;
    object.nickname = this.object?.nickname!;
    object.image = this.object?.image!;
    object.fkUser = {"id": this.loggedInUser!.id};
    this.updateObjectSubscription = this.objectService.updateObject(object).subscribe({
      next: (response: Object) => {
        this.getObjects();
        this.unmodify();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      },
      complete: () => {
        this.toastr.success("Object updated", "Object", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  deleteObject(object: Object) {
    this.deleteObjectSubscription = this.objectService.deleteObject(object.id).subscribe({
      next: (response: void) => {
        this.getObjects();
        this.unmodify();
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
}