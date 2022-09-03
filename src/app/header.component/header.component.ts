import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class AppComponentHeader{
  @Input() title!: string;
  @Input() isConnected!: boolean;

  constructor(private router: Router) {}
  
  logout() {
    localStorage.removeItem('loggedInUserEmail');
    this.router.navigate(['/connect'])
    .then(() => {
      window.location.reload();
    });
  }
}