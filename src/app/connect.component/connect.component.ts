import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class AppComponentConnect {
  imagePath: string = environment.imagePath;
  isRegistering: boolean = false; 

  onRegister() {
    this.isRegistering = true;
  }
  
  onLogin() {
    this.isRegistering = false;
  }
}
