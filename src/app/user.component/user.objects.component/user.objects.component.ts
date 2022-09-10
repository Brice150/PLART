import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Object } from 'src/app/models/object';
import { User } from 'src/app/models/user';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-objects',
  templateUrl: './user.objects.component.html',
  styleUrls: ['./user.objects.component.css']
})
export class AppComponentUserObjects implements OnInit{
  imagePath: string = environment.imagePath+"objects/";
  @Input() loggedInUserEmail!: string | null;
  objects: Object[] = [];

  constructor (
    private userService: UserService,
    private objectService: ObjectService) {}

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

  download(object: Object) {
    if (object?.fileToDownload) {
      this.objectService.downloadObject(object?.fileToDownload).subscribe(
        event => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            if (event.body instanceof Array) {
              
            }
            else {
              saveAs(new File([event.body!], event.headers.get('File-Name')!, 
              {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
            }
        }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
}
