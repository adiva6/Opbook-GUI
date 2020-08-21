import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.router';
import { HeaderModule } from './common/header/header.module';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { CourseService } from './services/course/course.service';
import { UserService } from './services/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from './pages/layout/layout.module';
import {SignupService} from './services/signup/signup.service';
import {AlertService} from './services/alert/alert.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PostService} from './services/post/post.service';
import {HttpHandler} from './utils/http/http-handler';
import {PostCommentService} from './services/post-comment/post-comment.service';
import {LikeService} from './services/like/like.service';
import {CourseGuard} from './guards/course/course.guard';
import {LectureService} from './services/lecture/lecture.service';
import {LectureCommentService} from './services/lecture-comment/lecture-comment.service';
import {CourseRatingService} from './services/course-rating/course-rating.service';
import {VideoService} from "./services/video/video.service";
import {SidenavService} from "./services/sidenav/sidenav.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService, AuthGuard, CourseGuard, CourseService, UserService, SignupService, AlertService,
    PostService, HttpHandler, PostCommentService, LikeService, LectureService, LectureCommentService,
    CourseRatingService, VideoService, SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
