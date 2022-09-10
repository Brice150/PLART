import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
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
  objects: Object[]=[];

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getObjects();
  }

  getObjects() {
    this.userService.findUserByEmail(this.loggedInUserEmail!).subscribe(
      (response: User) => {
        if (response.objects) {
          this.objects=response.objects!;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
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