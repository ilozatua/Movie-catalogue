import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class ShellModule {}
