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
    picturesData!: FormData;
    fileName!: string;
    pictureName!: string;
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
      this.addObjectSubscription && this.addObjectSubscription.unsubscribe();
      this.getLoggedInUserSubscription && this.getLoggedInUserSubscription.unsubscribe();
    }

    addFile(files: File[]) {
      this.filesData = new FormData();
      this.fileName = "";
      for (const file of files) {
        this.filesData.append('files', file, file.name);
        if (this.fileName === "") {
          this.fileName = file.name;
        }
      }
    }

    addImage(files: File[]) {
      this.picturesData = new FormData();
      this.pictureName = "";
      for (const file of files) {
        this.picturesData.append('pictures', file, file.name);
        if (this.pictureName === "") {
          this.pictureName = file.name;
        }
      }
    }

    addObject(object: Object) {
      object.fkUser={"id":this.loggedInUser?.id};
      object.image = this.pictureName;
      if (this.filesData !== undefined) {
        object.fileToDownload = this.fileName;
        this.addObjectSubscription = this.objectService.addObject(object, this.filesData, this.picturesData).subscribe({
          next: (response: Object) => {
            this.addForm.reset();
            this.filesData = new FormData();
            this.fileName = "";
            this.picturesData = new FormData();
            this.pictureName = "";
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