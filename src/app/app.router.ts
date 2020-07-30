import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/layout/layout.module').then(mod => mod.LayoutModule),
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(mod => mod.NotFoundModule),
  },
  {path: '**', redirectTo: 'not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
