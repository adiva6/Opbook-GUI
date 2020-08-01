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
    AuthService, AuthGuard, CourseService, UserService, SignupService, AlertService, PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
