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
import { LectureComponent } from './course-page/lectures/lecture/lecture.component';
import {VideoModule} from "../../common/video/video.module";
import { LectureCommentsComponent } from './course-page/lectures/lecture/lecture-comments/lecture-comments.component';
import { LectureCommentFormComponent } from './course-page/lectures/lecture/lecture-comment-form/lecture-comment-form.component';
import {NgxStarsModule} from "ngx-stars";
import { RateComponent } from './course-page/review/rate/rate.component';
import { RatingResultsComponent } from './course-page/review/rating-results/rating-results.component';
import { AddLectureComponent } from './course-page/lectures/add-lecture/add-lecture.component';
import { CoursesSignupComponent } from './courses-signup/courses-signup.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { CourseTileComponent } from './courses-signup/course-tile/course-tile.component';
import {MatToolbarModule} from "@angular/material/toolbar";


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
        MatIconModule,
        VideoModule,
        NgxStarsModule,
        MatGridListModule,
        MatToolbarModule
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
        PostFormComponent,
        LectureComponent,
        LectureCommentsComponent,
        LectureCommentFormComponent,
        RateComponent,
        RatingResultsComponent,
        AddLectureComponent,
        CoursesSignupComponent,
        CourseTileComponent
    ]
})
export class LayoutModule {
}
