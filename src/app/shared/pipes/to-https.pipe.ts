import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHttps'
})
export class ToHttpsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return;

    if (value.match('^https://')) {
      return value;
    } else if (value.match('^http://')) {
      return value.replace('http://', 'https://');
    } else if (value.match('^//')) {
      return value.replace('//', 'https://');
    } else if (value.match('^/')) {
      return value.replace('^/', 'https://');
    } else {
      return `https//:${value}`;
    }
  }

}
