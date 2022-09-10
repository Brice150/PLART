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
        image: ['']
      })

      this.getLoggedInUser();
    }

    addObject(object: Object) {
      object.nickname=this.loggedInUser?.nickname!;
      object.fkUser=this.loggedInUser!;
      this.objectService.addObject(object).subscribe(
        (response: Object) => {
          this.snackBar.open("Content updated", "Dismiss", {duration: 2000})
          .afterDismissed().subscribe(() => {
            window.location.reload();
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
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