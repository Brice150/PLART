import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Object } from 'src/app/models/object';
import { ObjectService } from 'src/app/services/object.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})



export class AppComponentCards implements OnInit {
  imagePath: string = environment.imagePath+"objects/";
  objects: Object[]=[];
  categories: string[]=[];

  constructor(
    private objectService: ObjectService) {}

  ngOnInit() {
    this.getObjects();
  }

  getObjects() {
    this.objectService.getObjects().subscribe(
      (response: Object[]) => {
        this.objects=response;
        for (let object of this.objects) {
          if (!this.categories.includes(object.category)) {
            this.categories.push(object?.category);
          }
        }
        if (!this.categories.includes("X")) {
          this.categories.push("X");
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

  search(key: string){
    const results: Object[] = [];
    for (const object of this.objects) {
      if (object.name?.toLowerCase().indexOf(key.toLowerCase())!== -1
      || object.nickname?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(object);
      }
    }
    this.objects = results;
    if (results.length === 0 ||!key) {
      this.getObjects();
    }
  }
  
  activateCategory(category: string) {
    const results: Object[] = [];
    for (const object of this.objects) {
      if (object?.category === category) {
        results.push(object);
      }
    }
    if (results.length !== 0) {
      this.objects = results;
    }
    else {
      this.getObjects();
    }
  }
}