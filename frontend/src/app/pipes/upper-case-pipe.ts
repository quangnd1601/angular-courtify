import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCasePipe',
})
export class UpperCasePipe implements PipeTransform {
  transform(value: String) {
    return value.toUpperCase();
  }
}
