import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() isConnected!: boolean;

  constructor(private router: Router) {}

  logout() {
    sessionStorage.removeItem('role');
    this.router.navigate(['/connect']).then(() => {
      window.location.reload();
    });
  }
}
