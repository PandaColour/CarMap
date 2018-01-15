import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ss'
})
export class SsPipe implements PipeTransform {

  transform(s1: number, s2: number, s3: number, s4: number): any {
    let status = [];
    if (s1 & 0x0001) {
      status.push('GPS定位有效');
    } else {
      status.push('GPS定位无效');
    }

    if (s1 & 0x0002) {
      status.push('ACC开启');
    } else {
      status.push('ACC关闭');
    }

    return status.join(',');
  }

}
