import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagePath: string = environment.imagePath;

  ngOnInit() {
  let btn : any = document.querySelector("#btn");
  let sidebar: any = document.querySelector(".sidebar");
  const home = document.getElementById('home');

    btn.onclick = function () {
      sidebar.classList.toggle("active");
    }

  }
}
