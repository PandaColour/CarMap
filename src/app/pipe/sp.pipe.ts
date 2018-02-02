import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sp'
})
export class SpPipe implements PipeTransform {

  transform(s1: number): any {
    return s1 / 10;
  }

}
