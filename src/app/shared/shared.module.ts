import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerComponent, LoadingComponent } from './loading';
import { MustMatchDirective } from './directives/must-match.directive';

@NgModule({
  declarations: [LoadingComponent, LoadingSpinnerComponent, MustMatchDirective],
  imports: [CommonModule],
  exports: [TranslateModule, LoadingComponent, MustMatchDirective],
})
export class SharedModule {}
