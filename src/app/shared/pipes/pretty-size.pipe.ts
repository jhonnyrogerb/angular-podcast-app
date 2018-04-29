import { Pipe, PipeTransform } from '@angular/core';
import * as pretty from 'prettysize';

@Pipe({
  name: 'prettySize'
})
export class PrettySizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return pretty(value);
  }

}
