import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user';


@Pipe({
  name: 'userFullname'
})
export class UserFullnamePipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    if (  value.fn) {
      return value.fn + ' ' + value.ln;

    }
    return '';
  }

}
