import { Injectable } from '@angular/core';

// Used to allow string to carry out dynamic index on numeralNumberConversion
type tDigitOptions = {
  [key: string]: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class NumeralsService {

  testVariableNormalNumber: number = 0;
  testVariableRomanNumeral: string = '';

  numeralNumberConversion: tDigitOptions = {
    digits1: [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX' ],
    digits2: [ 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC' ],
    digits3: [ 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM' ],
    digits4: [ 'M', 'MM', 'MMM' ]
  }

  constructor() { }

  normalNumbersToRomanNumerals(value: number) {
    this.testVariableNormalNumber = value;
    return new Promise((resolve, reject) => {
      // Determine length of number
      const arrayOfDigits = value.toString().split('');
      const lengthOfNumber = arrayOfDigits.length;
      if(value > 3000 || value == 0) {
        reject('The Romans never had such numbers! Try entering a number above 0 and below 3,000');
      } else {
        let finalNumeral = '';
        for(let i = 0; i < lengthOfNumber; i++) {
          const index = Number(arrayOfDigits[i])-1;
          finalNumeral += this.numeralNumberConversion['digits'+lengthOfNumber][index];
        }
        this.testVariableRomanNumeral = finalNumeral;
        resolve(finalNumeral);
      }
    });
  }

  romanNumeralsToNormalNumbers(value: string) {
    this.testVariableRomanNumeral = value;
    return new Promise((resolve, reject) => {
      
    });
  }
}
