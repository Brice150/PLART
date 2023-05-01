import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})



export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}