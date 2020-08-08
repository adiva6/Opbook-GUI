import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from './layout.component';
import {SignupComponent} from '../login/signup/signup.component';
import {LayoutRoutingModule} from './layout.router';
import {HeaderModule} from '../../common/header/header.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HomeComponent} from './feed/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PostComponent} from './course-page/posts/post/post.component';
import {CoursesMenuComponent} from './courses-menu/courses-menu.component';
import {MatListModule} from '@angular/material/list';
import {CoursePageComponent} from './course-page/course-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PostsComponent} from './course-page/posts/posts.component';
import {LecturesComponent} from './course-page/lectures/lectures.component';
import {ReviewComponent} from './course-page/review/review.component';
import {PostCommentFormComponent} from './course-page/posts/post/post-comment-form/post-comment-form.component';
import {MatIconModule} from '@angular/material/icon';
import {PostCommentsComponent} from './course-page/posts/post/post-comments/post-comments.component';
import {TimeAgoExtendsPipe} from "../../pipes/time-ago-pipe";
import { PostFormComponent } from './course-page/posts/post-form/post-form.component';
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule,
        RouterModule,
        HeaderModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatIconModule
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
        ReviewComponent,
        PostCommentFormComponent,
        PostCommentsComponent,
        TimeAgoExtendsPipe,
        PostFormComponent
    ]
})
export class LayoutModule {
}
