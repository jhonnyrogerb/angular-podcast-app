import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettySizePipe } from '@shared/pipes/pretty-size.pipe';
import { DateFromNowPipe } from '@shared/pipes/date-from-now.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrettySizePipe,
    DateFromNowPipe
  ],
  providers: [
    PrettySizePipe,
    DateFromNowPipe
  ],
  exports: [
    PrettySizePipe,
    DateFromNowPipe
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
