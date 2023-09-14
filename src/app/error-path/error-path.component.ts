import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-path',
  templateUrl: './error-path.component.html',
  styleUrls: ['./error-path.component.css'],
})
export class ErrorPathComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.toastr.error('URL not available', 'URL', {
      positionClass: 'toast-bottom-center',
    });
  }
}
