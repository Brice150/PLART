import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Object } from 'src/app/models/object';
import { User } from 'src/app/models/user';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-objects-add',
  templateUrl: './user.objects.add.component.html',
  styleUrls: ['./user.objects.add.component.css']
})
export class AppComponentUserObjectsAdd implements OnInit{
    @Input() loggedInUserEmail!: string | null;
    loggedInUser!: User | null;
    addForm!: FormGroup;
    formData!: FormData;
    filename!: string;

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
        description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
        image: ['', [Validators.pattern('(^.*.png$)|(^.*.jpg$)|(^.*.jpeg$)')]]
      })

      this.getLoggedInUser();
    }

    addFile(files: File[]) {
      this.formData = new FormData();
      this.filename = "";
      for (const file of files) {
        this.formData.append('files', file, file.name);
        if (this.filename === "") {
          this.filename = file.name;
        }
      }
    }

    addObject(object: Object) {
      object.nickname=this.loggedInUser?.nickname!;
      object.fkUser={"id":this.loggedInUser?.id};
      if (!object.image) {
        object.image = "No-Image.jpg";
      }
      if (this.formData !== undefined) {
        object.fileToDownload = this.filename;
        console.log(object);
        this.objectService.uploadObject(this.formData).subscribe(
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