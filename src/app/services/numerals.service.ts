import { Injectable } from '@angular/core';

// Used to allow string to carry out dynamic index on numeralNumberConversion
type tDigitOptions = {
  [key: string]: Array<string>
}

type tNumberOptions = {
  [key: string]: {
    smallerSymbols: Array<string>,
    greaterSymbols: Array<string>,
    allowedBefore: Array<string>,
    allowedAfter: Array<string>,
    duplicatesAllowed: boolean,
    singleVal: number
  }
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

  numberNumeralConversion: tNumberOptions = {
    I: { smallerSymbols: [], greaterSymbols: ['V', 'X', 'L', 'C', 'D', 'M'], allowedBefore: [], allowedAfter: ['I', 'V', 'X'], duplicatesAllowed: true, singleVal: 1 },
    V: { smallerSymbols: ['I'], greaterSymbols: ['X', 'L', 'C', 'D', 'M'], allowedBefore: ['I'], allowedAfter: ['I'], duplicatesAllowed: false, singleVal: 5 },
    X: { smallerSymbols: ['I', 'V'], greaterSymbols: ['L', 'C', 'D', 'M'], allowedBefore: ['I', 'L'], allowedAfter: ['I', 'V', 'X', 'L', 'C'], duplicatesAllowed: true, singleVal: 10 },
    L: { smallerSymbols: ['I', 'V', 'X'], greaterSymbols: ['C', 'D', 'M'], allowedBefore: ['X'], allowedAfter: ['I', 'V'], duplicatesAllowed: false, singleVal: 50 },
    C: { smallerSymbols: ['I', 'V', 'X', 'L'], greaterSymbols: ['D', 'M'], allowedBefore: ['X', 'D'], allowedAfter: ['I', 'V', 'X', 'L', 'C', 'D', 'M'], duplicatesAllowed: true, singleVal: 100 },
    D: { smallerSymbols: ['I', 'V', 'X', 'L', 'C'], greaterSymbols: ['M'], allowedBefore: ['C'], allowedAfter: ['I', 'V', 'X', 'C'], duplicatesAllowed: false, singleVal: 500 },
    M: { smallerSymbols: ['I', 'V', 'X', 'L', 'C', 'D'], greaterSymbols: [], allowedBefore: ['C'], allowedAfter: ['I', 'V', 'X', 'L', 'C', 'D'], duplicatesAllowed: true, singleVal: 1000 },
  }

  constructor() { }

  normalNumbersToRomanNumerals(value: number) {
    this.testVariableNormalNumber = value;
    return new Promise((resolve, reject) => {
      // Determine length of number
      const arrayOfDigits = value.toString().split('');
      const lengthOfNumber = arrayOfDigits.length;
      if(value <= 3000 && value !== 0) {
        let finalNumeral: string = '';
        for(let i = 0; i < lengthOfNumber; i++) {
          // If 0 then skip as there is no roman numeral value for 0
          if(arrayOfDigits[i] != '0') {
            const index = Number(arrayOfDigits[i])-1;
            // The -i below helps to go down the numeralNumberConversion keys as the for loop goes through all the digits of the number
            finalNumeral += this.numeralNumberConversion['digits'+(lengthOfNumber-i)][index];
          }
        }
        this.testVariableRomanNumeral = finalNumeral;
        resolve(finalNumeral);
      } else {
        reject('The Romans never had such numbers! Try entering a number above 0 and below 3,000');
      }
    });
  }

  romanNumeralsToNormalNumbers(value: string) {
    this.testVariableRomanNumeral = value;
    // split up string into individual letters
    const arrayOfLetters = value.split('');
    let finalNumber: number = 0;
    let previousLetter: any = '';
    let currentLetter: string = '';
    let numeralStorage: Array<string> = [];
    let numeralStorageTemp = ''; // Used to temporarily store numerals until up to 3 intervals. Then this is cleared.
    let count = 0;
    let countNumeral = '';
    function doChecks(letter: string, numberNumeralConversion: tNumberOptions) {
      return new Promise((resolve, reject) => {
        currentLetter = letter;
        // Check to see if previous letter is in allowedBefore
        if(numberNumeralConversion[currentLetter].allowedBefore.indexOf(previousLetter) !== -1) {
          // Yes it has been found in allowedBefore
          // This number is also finalised as you can't have multiple smaller symbols before a greater symbol e.g. IIX
          numeralStorage.push(previousLetter+currentLetter);
          resolve(true);
        } else if(numberNumeralConversion[currentLetter].allowedAfter.indexOf(previousLetter) !== -1) {
          // Check to see if current letter is in allowedAfter of previousLetter
          // Yes it has been found in allowedAfter
          // We need to wait and see if multiple letters of the same value appear again.
          // If so the max is 3 times after which this is finalised.
          if(arrayOfLetters.length == 2) {
            numeralStorage.push(previousLetter+currentLetter);
            resolve(true);
          } else if(currentLetter == countNumeral) {
            numeralStorageTemp += currentLetter;
            if(count == arrayOfLetters.length-2 || count == 2) {
              numeralStorage.push(numeralStorageTemp);
              numeralStorageTemp = '';
              countNumeral = '';
              count = 0;
              resolve(true);
            }
            count++;
            resolve(true);
          } else {
            numeralStorageTemp += previousLetter+currentLetter;
            countNumeral = currentLetter;
            count++;
            resolve(true);
          }
        } else {
          // Neither allowed before or after therefore it is a finalised numeral
          numeralStorage.push(currentLetter);
          resolve(true);
        }
      });
    }
    return new Promise((resolve, reject) => {
      for(let i = 0; i < arrayOfLetters.length; i++) {
        // Rule 1: When a smaller symbol is after a greater symbol, it's added (up to a max of 3 - Rule 4).
        // Rule 2: If a symbol comes after itself, it's added (up to a max of 3 - Rule 4).
        // Rule 3: When a smaller symbol appears before a greater symbol, it is subtracted. (Can't have multiple smaller symbols before a greater symbol e.g. IIX)
        // Rule 4: The same symbol cannot be used more than three times in a row.
        if(
          arrayOfLetters[i] === 'I' ||
          arrayOfLetters[i] === 'V' ||
          arrayOfLetters[i] === 'X' ||
          arrayOfLetters[i] === 'L' ||
          arrayOfLetters[i] === 'C' ||
          arrayOfLetters[i] === 'D' ||
          arrayOfLetters[i] === 'M'
        ) {
          if(i == 0 && arrayOfLetters.length == 1) {
            resolve(this.numberNumeralConversion[arrayOfLetters[i]].singleVal);
          } else if(i == 0 && arrayOfLetters.length != 1) {
            previousLetter = arrayOfLetters[i];
            continue;
          } else {
            doChecks(arrayOfLetters[i], this.numberNumeralConversion).then(() => {
              if(i+1 == arrayOfLetters.length) {
                // We need to view the numerals collected in numeralStorage and convert to numbers
                let finalNumberList = [];
                for(let y = 0; y < numeralStorage.length; y++) {
                  let section = 1;
                  let index = this.numeralNumberConversion['digits'+section].indexOf(numeralStorage[y]);
                  if(index == -1) {
                    section = 2;
                    index = this.numeralNumberConversion['digits'+section].indexOf(numeralStorage[y]);
                    if(index == -1) {
                      section = 3;
                      index = this.numeralNumberConversion['digits'+section].indexOf(numeralStorage[y]);
                      if(index == -1) {
                        section = 4;
                        index = this.numeralNumberConversion['digits'+section].indexOf(numeralStorage[y]);
                      }
                    }
                  }
                  if(section == 4) {
                    finalNumberList.push((index+1)*1000);
                  } else if (section == 3) {
                    finalNumberList.push((index+1)*100);
                  } else if (section == 2) {
                    finalNumberList.push((index+1)*10);
                  } else if (section == 1) {
                    finalNumberList.push(index+1);
                  }
                }
                resolve(finalNumberList);
              }
            }).catch(() => {
              return;
            });
          }
        } else {
          // None of the accepted Roman Numeral characters exist in this string
          reject('The Romans never had such numerals! Try entering any of the following characters I, V, X, L, C, D or M')
        }
      }
    });
  }


}
