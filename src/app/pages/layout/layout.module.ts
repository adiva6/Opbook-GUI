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
import { HomeComponent } from './feed/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PostComponent } from './course-page/posts/post/post.component';
import { CoursesMenuComponent } from './courses-menu/courses-menu.component';
import {MatListModule} from '@angular/material/list';
import { CoursePageComponent } from './course-page/course-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PostsComponent } from './course-page/posts/posts.component';
import { LecturesComponent } from './course-page/lectures/lectures.component';
import { ReviewComponent } from './course-page/review/review.component';


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
    MatSidenavModule,
    MatListModule,
    MatTabsModule
  ],
  exports: [
    SignupComponent
  ],
  declarations: [
    LayoutComponent,
    SignupComponent,
    HomeComponent,
    PostComponent,
    CoursesMenuComponent,
    CoursePageComponent,
    PostsComponent,
    LecturesComponent,
    ReviewComponent
  ]
})
export class LayoutModule {
}
