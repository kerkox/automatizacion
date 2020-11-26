import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number, decimals: number = 0, useGrouping:boolean = true): string {
   return new Intl.NumberFormat("de-DE", { maximumFractionDigits: decimals, useGrouping }).format(value)    
  }

}
