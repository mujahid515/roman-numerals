import { TestBed } from '@angular/core/testing';

import { NumeralsService } from './numerals.service';

describe('NumeralsService', () => {
  let service: NumeralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert normal number to roman numeral', () => {
    for(let i = 1; i < 3001; i++) {
      expect(service.normalNumbersToRomanNumerals(i)).toBeTruthy();
    }
  });

  it('should convert roman numeral to normal number', () => {
    for(let i = 0; i < service.threeThousandNumeralsArray.length; i++) {
      expect(service.romanNumeralsToNormalNumbers(service.threeThousandNumeralsArray[i].numeral)).toBeTruthy();
    }
  });
});
