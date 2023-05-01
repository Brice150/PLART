import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Object } from 'src/app/core/interfaces/object';
import { User } from 'src/app/core/interfaces/user';
import { ObjectService } from 'src/app/core/services/object.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-objects',
  templateUrl: './user.objects.component.html',
  styleUrls: ['./user.objects.component.css']
})
export class UserObjectsComponent implements OnInit, OnDestroy{
  imagePath: string = environment.imagePath+"objects/";
  objects: Object[] = [];
  getObjectsSubscription!: Subscription;
  getImageSubscription!: Subscription;
  downloadSubscription!: Subscription;

  constructor (
    private userService: UserService,
    private objectService: ObjectService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.getObjects();
  }

  ngOnDestroy() {
    this.getObjectsSubscription && this.getObjectsSubscription.unsubscribe();
    this.getImageSubscription && this.getImageSubscription.unsubscribe();
    this.downloadSubscription && this.downloadSubscription.unsubscribe();
  }

  getObjects() {
    this.getObjectsSubscription = this.userService.getConnectedUser().subscribe({
      next: (response: User) => {
        if (response.objects) {
          this.objects=response.objects!;
          for (let object of this.objects) {
            this.getImage(object);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Server error", {
          positionClass: "toast-bottom-center" 
        })
      }
    })
  }

  getImage(object: Object) {
    let reader = new FileReader();
    if (object.image) {
      this.getImageSubscription = this.objectService.getImage(object.image.toString()).subscribe({
        next: event => {
          if (event.type === HttpEventType.Response) {
            if (event.body instanceof Array) {
              
            }
            else {
              let image = new File([event.body!], object.image.toString());
              reader.readAsDataURL(image);
              reader.onloadend = (loaded) => {
                object.image = reader.result!;
              }
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, "Server error", {
            positionClass: "toast-bottom-center" 
          })
        }
      })
    }
    else {
      object.image = this.imagePath + "No-Image.jpg";
    }
  }

  download(object: Object) {
    if (object?.fileToDownload) {
      this.downloadSubscription = this.objectService.downloadObject(object?.fileToDownload).subscribe({
        next: event => {
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
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, "Server error", {
            positionClass: "toast-bottom-center" 
          })
        },
        complete: () => {
          this.toastr.success("File downloaded", "Object", {
            positionClass: "toast-bottom-center" 
          })
        }
      })
    }
  }
}
