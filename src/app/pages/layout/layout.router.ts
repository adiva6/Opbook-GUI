import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SignupComponent } from '../login/signup/signup.component';
import { AuthGuard } from '../../guards/auth/auth.guard';
import {FeedComponent} from './feed/feed.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, canActivateChild: [AuthGuard],
        children: [
            { path: 'home', component: FeedComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
