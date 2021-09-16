import { Injectable } from '@angular/core';

// Used to allow string to carry out dynamic index on numeralNumberConversion
type tDigitOptions = {
  [key: string]: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class NumeralsService {

  numeralNumberConversion: tDigitOptions = {
    digits1: [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX' ],
    digits2: [ 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC' ],
    digits3: [ 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM' ],
    digits4: [ 'M', 'MM', 'MMM' ]
  }

  threeThousandNumeralsArray: Array<{ numeral: string, number: number }>;

  constructor() {
    this.threeThousandNumeralsArray = Array.from(Array(3000)).map((e,i) => {
      let finalNumeral = '';
      const finalNumber = i+1;
      // Determine how many digits the number is
      const finalNumberSplit: Array<string> = finalNumber.toString().split('');
      const digits = finalNumberSplit.length;
      if(digits == 1) {
        finalNumeral = this.numeralNumberConversion.digits1[i];
      } else if(digits == 2) {
        if(finalNumberSplit[1] == '0') {
          // This means it is either 10,20,30,40... all multiples of ten that are two digits
          finalNumeral = this.numeralNumberConversion.digits2[Number(finalNumberSplit[0])-1];
        } else {
          // All two digit numbers that are not a multiple of ten
          const firstDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[1])-1];
          finalNumeral = firstDigit+secondDigit;
        }
      } else if(digits == 3) {
        if(finalNumberSplit[2] == '0' && finalNumberSplit[1] == '0') {
          // This means it is either 100,200,300,400... all multiples of 100 that are three digits
          finalNumeral = this.numeralNumberConversion.digits3[Number(finalNumberSplit[0])-1];
        } else if(finalNumberSplit[1] == '0') {
          // All three digit numbers that are not a multiple of 100
          // And within the first 9 of that multiple of 100 range. E.g. 101-109, 201-209, 301-309 etc
          const firstDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[0])-1];
          const thirdDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[2])-1];
          finalNumeral = firstDigit+thirdDigit;
        } else if(finalNumberSplit[2] == '0') {
          // All 3 digit multiples of ten. E.g. 110, 120, 230, 360 etc
          const firstDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[1])-1];
          finalNumeral = firstDigit+secondDigit;
        } else {
          // All other 3 digit numbers
          const firstDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[1])-1];
          const thirdDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[2])-1];
          finalNumeral = firstDigit+secondDigit+thirdDigit;
        }
      } else if (digits == 4) {
        if(finalNumberSplit[3] == '0' && finalNumberSplit[2] == '0' && finalNumberSplit[1] == '0') {
          // This means it is either 1000,2000 or 3000
          finalNumeral = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
        } else if(finalNumberSplit[2] == '0' && finalNumberSplit[1] == '0') {
          // All four digit numbers that are not a multiple of 1000
          // And within the first 9 of that multiple of 1000 range. E.g. 1001-1009, 2001-2009, 3001-3009 etc
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const fourthDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[3])-1];
          finalNumeral = firstDigit+fourthDigit;
        } else if(finalNumberSplit[3] == '0' && finalNumberSplit[1] == '0') {
          // All 4 digit multiples of ten not going into hundreds of that range. E.g. 1010, 2020, 2030, 2090 etc
          // E.g. of what this does NOT do: 1100, 1200, 2200 etc
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const thirdDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[2])-1];
          finalNumeral = firstDigit+thirdDigit;
        } else if(finalNumberSplit[3] == '0' && finalNumberSplit[2] == '0') {
          // All 4 digit multiples of hundred going into hundreds of that range. E.g. 1100, 2100, 2300, 2900 etc
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[1])-1];
          finalNumeral = firstDigit+secondDigit;
        } else if(finalNumberSplit[1] == '0') {
          // All 4 digits which have 0 as their second digit. E.g. 1010, 2032, 2099 etc
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const thirdDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[2])-1];
          const fourthDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[3])-1];
          finalNumeral = firstDigit+thirdDigit+fourthDigit;
        } else if(finalNumberSplit[2] == '0') {
          // All 4 digits which have 0 as their third digit. E.g. 1101, 2102, 2509 etc
          // Also NOT ending in 0 like 1100, 2100, 2500 etc
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[1])-1];
          const fourthDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[3])-1];
          finalNumeral = firstDigit+secondDigit+fourthDigit;
        } else if(finalNumberSplit[3] == '0') {
          // All 4 digits which have 0 as their fourth digit. E.g. 1110, 2120, 2530 etc
          // Also a multiple of ten
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[1])-1];
          const thirdDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[2])-1];
          finalNumeral = firstDigit+secondDigit+thirdDigit;
        } else {
          // All other 4 digit numbers
          const firstDigit = this.numeralNumberConversion.digits4[Number(finalNumberSplit[0])-1];
          const secondDigit = this.numeralNumberConversion.digits3[Number(finalNumberSplit[1])-1];
          const thirdDigit = this.numeralNumberConversion.digits2[Number(finalNumberSplit[2])-1];
          const fourthDigit = this.numeralNumberConversion.digits1[Number(finalNumberSplit[3])-1];
          finalNumeral = firstDigit+secondDigit+thirdDigit+fourthDigit;
        }
      }
      const obj = { numeral: finalNumeral, number: finalNumber }
      return obj;
    })
  }

  normalNumbersToRomanNumerals(value: number) {
    const result = this.threeThousandNumeralsArray.find(x => x.number === value)?.numeral;
    return result;
  }

  romanNumeralsToNormalNumbers(value: string) {
    const result: any = this.threeThousandNumeralsArray.find(x => x.numeral === value)?.number;
    return result;
  }

}
