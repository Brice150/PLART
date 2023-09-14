import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin.users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [CommonModule, FormsModule],
  exports: [AdminUsersComponent],
})
export class AdminUsersModule {}
