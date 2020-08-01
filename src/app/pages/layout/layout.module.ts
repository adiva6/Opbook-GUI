import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { SignupComponent } from '../login/signup/signup.component';
import { LayoutRoutingModule } from './layout.router';
import { HeaderModule } from '../../common/header/header.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FeedComponent } from './feed/feed.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PostComponent } from './feed/post/post.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    HeaderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule
  ],
  exports: [
    SignupComponent
  ],
  declarations: [
    LayoutComponent,
    SignupComponent,
    FeedComponent,
    PostComponent
  ]
})
export class LayoutModule {
}
