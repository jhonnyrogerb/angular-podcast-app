import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettySizePipe } from '@shared/pipes/pretty-size.pipe';
import { DateFromNowPipe } from '@shared/pipes/date-from-now.pipe';
import { ToHttpsPipe } from './pipes/to-https.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe
  ],
  providers: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe
  ],
  exports: [
    PrettySizePipe,
    DateFromNowPipe,
    ToHttpsPipe
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
