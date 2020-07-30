import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, canActivateChild: [AuthGuard],
        children: [
            { path: 'signup', component: SignupComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
