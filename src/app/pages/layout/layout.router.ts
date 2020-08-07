import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { HomeComponent } from './feed/home.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {CourseGuard} from "../../guards/course/course.guard";

const routes: Routes = [
    {
        path: '', component: LayoutComponent, canActivateChild: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'courses/:courseSymbol', component: CoursePageComponent, canActivate: [CourseGuard] },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
