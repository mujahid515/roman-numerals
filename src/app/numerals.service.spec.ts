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

  it('normal number should be less than or equal to 3000', () => {
    service.normalNumbersToRomanNumerals(3001).catch(() => {
      fail('The Romans never had such numbers! Try entering a number above 0 and below 3,000');
    });
  });

  it('normal number should not equal 0', () => {
    service.normalNumbersToRomanNumerals(0).catch(() => {
      fail('The Romans never had such numbers! Try entering a number above 0 and below 3,000');
    });
  });

  it('roman numeral should be less than or equal to MMM', () => {
    service.romanNumeralsToNormalNumbers('MMMI').catch(() => {
      fail('The Romans never had such high numbers! Try entering a roman numeral below 3,000 (MMM)');
    });
  });

  it('should convert normal number to roman numeral', () => {
    expect(service.testVariableNormalNumber).toBe(0);
    expect(service.testVariableRomanNumeral).toBe('');
    service.normalNumbersToRomanNumerals(1);
    expect(service.testVariableRomanNumeral).toBe('I');
    service.normalNumbersToRomanNumerals(10);
    expect(service.testVariableRomanNumeral).toBe('X');
    service.normalNumbersToRomanNumerals(7);
    expect(service.testVariableRomanNumeral).toBe('VII');
  });

  it('should convert roman numeral to normal number', () => {
    expect(service.testVariableNormalNumber).toBe(0);
    expect(service.testVariableRomanNumeral).toBe('');
    service.romanNumeralsToNormalNumbers('I')
    expect(service.testVariableNormalNumber).toBe(1);
    service.romanNumeralsToNormalNumbers('X')
    expect(service.testVariableNormalNumber).toBe(10);
    service.romanNumeralsToNormalNumbers('VII')
    expect(service.testVariableNormalNumber).toBe(7);
  });
});
