import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { OpbookBannerComponent } from '../opbook-banner/opbook-banner.component';
import { AccountLogoutComponent } from '../account-logout/account-logout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    HeaderComponent,
    OpbookBannerComponent,
    AccountLogoutComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
