import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
})
export class ConnectComponent {
  imagePath: string = environment.imagePath;
  isRegistering: boolean = false;

  onRegister() {
    this.isRegistering = true;
  }

  onLogin() {
    this.isRegistering = false;
  }
}
