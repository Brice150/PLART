import { NgModule } from '@angular/core';
import { CustomDatePipe } from './pipes/custom-date.pipe';

const declarations = [CustomDatePipe];

@NgModule({
  declarations,
  imports: [],
  exports: declarations,
})
export class SharedModule {}
