import { NotFoundRoutingModule } from './not-found.router';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    RouterModule
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
