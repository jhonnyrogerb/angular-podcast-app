import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettySizePipe } from '@shared/pipes/pretty-size.pipe';
import { DateFromNowPipe } from '@shared/pipes/date-from-now.pipe';
import { ToHttpsPipe } from './pipes/to-https.pipe';
import {LazyLoadImageDirective} from '@shared/directives/lazy-load-image.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe,
    LazyLoadImageDirective
  ],
  providers: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe,
    LazyLoadImageDirective
  ],
  exports: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe,
    LazyLoadImageDirective
  ]
})
export class SharedModule {
  static forRoot() {
    return {
        ngModule: SharedModule,
        providers: [],
    };
 }
}
