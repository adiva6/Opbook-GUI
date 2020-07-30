import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutRoutingModule } from './layout.router';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    HeaderModule
  ],
  declarations: [
    LayoutComponent,
    SignupComponent
  ]
})
export class LayoutModule {
}
