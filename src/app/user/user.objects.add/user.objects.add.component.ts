import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Object } from 'src/app/core/interfaces/object';
import { User } from 'src/app/core/interfaces/user';
import { ObjectService } from 'src/app/core/services/object.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-objects-add',
  templateUrl: './user.objects.add.component.html',
  styleUrls: ['./user.objects.add.component.css']
})
export class UserObjectsAddComponent implements OnInit, OnDestroy{
    loggedInUser!: User | null;
    addForm!: FormGroup;
    filesData!: FormData;
    imagesData!: FormData;
    filename!: string;
    imagename!: string;
    addImageSubscription!: Subscription;
    addFileSubscription!: Subscription;
    addObjectSubscription!: Subscription;
    getLoggedInUserSubscription!: Subscription;

    constructor (
      private fb: FormBuilder,
      private objectService: ObjectService,
      private userService: UserService,
      private toastr: ToastrService
    ) {}

    ngOnInit() {
      this.addForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        category: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]]
      })

      this.getLoggedInUser();
    }

    ngOnDestroy() {
      this.addImageSubscription && this.addImageSubscription.unsubscribe();
      this.addFileSubscription && this.addFileSubscription.unsubscribe();
      this.addObjectSubscription && this.addObjectSubscription.unsubscribe();
      this.getLoggedInUserSubscription && this.getLoggedInUserSubscription.unsubscribe();
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
        this.addImageSubscription = this.objectService.uploadImage(this.imagesData).subscribe({
          next: event => {
            console.log(event);
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Server error", {
              positionClass: "toast-bottom-center" 
            })
          }
        })
      }
      if (this.filesData !== undefined) {
        object.fileToDownload = this.filename;
        this.addFileSubscription = this.objectService.uploadFile(this.filesData).subscribe({
          next: event => {
            console.log(event);
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Server error", {
              positionClass: "toast-bottom-center" 
            })
          }
        })
        this.addObjectSubscription = this.objectService.addObject(object).subscribe({
          next: (response: Object) => {
            this.addForm.reset();
            this.filesData = new FormData();
            this.filename = "";
            this.imagesData = new FormData();
            this.imagename = "";
          }, 
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Server error", {
              positionClass: "toast-bottom-center" 
            })
          },
          complete: () => {
            this.toastr.success("Object added", "Object", {
              positionClass: "toast-bottom-center" 
            })
          }
      })
      }
      else {
        this.toastr.warning("File must be added", "Object", {
          positionClass: "toast-bottom-center" 
        })
      }
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
}