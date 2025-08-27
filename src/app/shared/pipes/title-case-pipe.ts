import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string | null): string {
    if(value){
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }else{
      return '';
    }
  }

}
