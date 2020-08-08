import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AccountLogoutComponent } from '../account-logout/account-logout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent,
    AccountLogoutComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
