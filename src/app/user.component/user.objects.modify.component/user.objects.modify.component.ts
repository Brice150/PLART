import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponentDialog } from 'src/app/dialog.component/dialog.component';
import { Object } from 'src/app/models/object';
import { User } from 'src/app/models/user';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-objects-modify',
  templateUrl: './user.objects.modify.component.html',
  styleUrls: ['./user.objects.modify.component.css']
})
export class AppComponentUserObjectsModify {
  @Input() loggedInUserEmail!: string | null;
  loggedInUser!: User | null;
  objects: Object[]=[];
  object!: Object | null;
  updateForm!: FormGroup;

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      image: ['', [Validators.pattern('(^.*.png$)|(^.*.jpg$)|(^.*.jpeg$)')]]
    })

    this.getLoggedInUser();
    this.getObjects();
  }

  getLoggedInUser() {
    this.userService.findUserByEmail(this.loggedInUserEmail!).subscribe(
      (response: User) => {
        this.loggedInUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getObjects() {
    this.userService.findUserByEmail(this.loggedInUserEmail!).subscribe(
      (response: User) => {
        if (response.objects.length !== 0) {
          this.objects=response.objects!;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
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
    object.fkUser = {"id": this.loggedInUser!.id};
    this.objectService.updateObject(object).subscribe(
      (response: Object) => {
        this.getObjects();
        this.snackBar.open("Content updated", "Dismiss", {duration: 2000});
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  deleteObject(object: Object) {
    this.objectService.deleteObject(object.id).subscribe(
    (response: void) => {
      this.getObjects();
      this.snackBar.open("Content deleted", "Dismiss", {duration: 2000});
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  openDialog(object: Object) {
    const dialogRef = this.dialog.open(AppComponentDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteObject(object);
      }
    });
  }
}