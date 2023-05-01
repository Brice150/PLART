import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Object } from 'src/app/core/interfaces/object';
import { ObjectService } from 'src/app/core/services/object.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit, OnDestroy {
  imagePath: string = environment.imagePath+"objects/";
  objects: Object[]=[];
  categories: string[]=[];
  filteredObjects: Object[]=[];
  selectedChip!: string;
  getObjectsSubscription!: Subscription;
  getImageSubscription!: Subscription;
  downloadSubscription!: Subscription;

  constructor(
    private objectService: ObjectService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.getObjects();
  }

  ngOnDestroy() {
    this.getObjectsSubscription && this.getObjectsSubscription.unsubscribe();
    this.getImageSubscription && this.getImageSubscription.unsubscribe();
    this.downloadSubscription && this.downloadSubscription.unsubscribe();
  }

  getObjects() {
    this.getObjectsSubscription = this.objectService.getObjects().subscribe({
      next: (response: Object[]) => {
        this.objects=response;
        this.filteredObjects=response;
        for (let object of this.objects) {
          this.getImage(object);
          if (!this.categories.includes(object.category)) {
            this.categories.push(object?.category);
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
        }
      })
    }
  }

  search(key: string){
    let withCategoryCondition: boolean = false;
    let noCategoryCondition: boolean = false;
    if (!this.selectedChip) {
      this.filteredObjects = [];
      for (const object of this.objects) {
        noCategoryCondition = (object.name?.toLowerCase().indexOf(key.toLowerCase())!== -1
                                            || object.nickname?.toLowerCase().indexOf(key.toLowerCase())!== -1);
        if (noCategoryCondition) {
          this.filteredObjects.push(object);
        }
      }
      if (this.filteredObjects.length === 0 ||!key) {
        this.filteredObjects = this.objects;
      }
    }
    else {
      this.filteredObjects = [];
      for (const object of this.objects) {
        withCategoryCondition = ((object.name?.toLowerCase().indexOf(key.toLowerCase())!== -1
                                            || object.nickname?.toLowerCase().indexOf(key.toLowerCase())!== -1) 
                                            && object.category === this.selectedChip);
        if (withCategoryCondition) {
          this.filteredObjects.push(object);
        }
      }
      if (this.filteredObjects.length === 0 ||!key) {
        this.activateCategory();
      }
    }
  }
  
  activateCategory() {
    if (!this.selectedChip) {
      this.filteredObjects = this.objects;
    }
    else {
      this.filteredObjects = [];
      for (const object of this.objects) {
        if (object?.category === this.selectedChip) {
          this.filteredObjects.push(object);
        }
      }
    }
  }
}