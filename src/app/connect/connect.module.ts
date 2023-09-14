import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './connect.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [ConnectComponent],
  imports: [CommonModule, RegisterModule, LoginModule, HeaderModule],
  exports: [ConnectComponent],
})
export class ConnectModule {}
