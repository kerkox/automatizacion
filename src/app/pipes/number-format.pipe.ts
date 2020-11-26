import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string, decimals: number = 0, useGrouping:boolean = true): string {
    const value_number = Number(value)
   return new Intl.NumberFormat("de-DE", { maximumFractionDigits: decimals, useGrouping }).format(value_number)    
  }

}
