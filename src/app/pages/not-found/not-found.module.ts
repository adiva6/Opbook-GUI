import { NotFoundRoutingModule } from './not-found.router';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        RouterModule,
        MatButtonModule
    ],
  declarations: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
