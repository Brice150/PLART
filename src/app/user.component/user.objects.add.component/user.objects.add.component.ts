import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Object } from 'src/app/models/object';
import { User } from 'src/app/models/user';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-user-objects-add',
  templateUrl: './user.objects.add.component.html',
  styleUrls: ['./user.objects.add.component.css']
})
export class AppComponentUserObjectsAdd implements OnInit{
    @Input() loggedInUserEmail!: string | null;
    loggedInUser!: User | null;
    addForm!: FormGroup;
    filesData!: FormData;
    imagesData!: FormData;
    filename!: string;
    imagename!: string;

    constructor (
      private fb: FormBuilder,
      private objectService: ObjectService,
      private userService: UserService,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
      this.addForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        category: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]]
      })

      this.getLoggedInUser();
    }

    addFile(files: File[]) {
      this.filesData = new FormData();
      this.filename = "";
      for (const file of files) {
        this.filesData.append('files', file, file.name);
        if (this.filename === "") {
          this.filename = file.name;
        }
      }
    }

    addImage(files: File[]) {
      this.imagesData = new FormData();
      this.imagename = "";
      for (const file of files) {
        this.imagesData.append('images', file, file.name);
        if (this.imagename === "") {
          this.imagename = file.name;
        }
      }
    }

    addObject(object: Object) {
      object.nickname=this.loggedInUser?.nickname!;
      object.fkUser={"id":this.loggedInUser?.id};
      if (this.imagename) {
        object.image = this.imagename;
        this.objectService.uploadImage(this.imagesData).subscribe(
          event => {
            console.log(event);
          },
          (error: HttpErrorResponse) => {
            alert(error);
          }
        );
      }
      if (this.filesData !== undefined) {
        object.fileToDownload = this.filename;
        this.objectService.uploadFile(this.filesData).subscribe(
          event => {
            console.log(event);
          },
          (error: HttpErrorResponse) => {
            alert(error);
          }
        );
        this.objectService.addObject(object).subscribe(
          (response: Object) => {
            this.snackBar.open("Content added", "Dismiss", {duration: 1000})
            .afterDismissed().subscribe(() => {
              window.location.reload();
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
      else {
        alert("File must be added !");
      }
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
}