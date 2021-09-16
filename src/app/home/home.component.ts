import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NumeralsService } from '../services/numerals.service';
declare var UIkit: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("inputValue", { read: ElementRef, static: true }) inputValue!: ElementRef;
  @ViewChild("selectValue", { read: ElementRef, static: true }) selectValue!: ElementRef;
  @ViewChild("slideShow", { read: ElementRef, static: true }) slideShow!: ElementRef;

  result: string | undefined = '';

  currentSelect = 'Type any number from 1 to 3,000...';

  levelUp = new Audio('/assets/sounds/level-up.wav');
  errorSound = new Audio('/assets/sounds/error.wav');

  constructor(private numeralsService: NumeralsService) { }

  ngOnInit(): void {
    UIkit.slideshow(this.slideShow.nativeElement).startAutoplay();
  }

  convert(event: any) {
    event.preventDefault();
    const value = this.inputValue.nativeElement.value;
    if(this.selectValue.nativeElement.value == 'numberToRoman') {
      this.result = this.numeralsService.normalNumbersToRomanNumerals(Number(value));
      if(this.result === undefined) {
        UIkit.modal.alert('The Romans never had such numbers! Try entering a number between 1 and 3,000');
        this.errorSound.play();
      } else {
        // play sound
        this.levelUp.play();
      }
    } else if(this.selectValue.nativeElement.value == 'romanToNumber') {
      const res = this.numeralsService.romanNumeralsToNormalNumbers(value);
      if(res === undefined) {
        UIkit.modal.alert('The Romans never had such numerals! Try entering any of the following characters I, V, X, L, C, D or M');
        this.errorSound.play();
      } else {
        this.result = res.toString();
        // play sound
        this.levelUp.play();
      }
    }
  }

  changeCurrentSelect(event: any) {
    this.inputValue.nativeElement.value = '';
    if(event.target.value == 'numberToRoman') {
      this.currentSelect = 'Type any number from 1 to 3,000...';
    } else {
      this.currentSelect = 'Type a valid Roman Numeral. E.g. XII...';
    }
  }

}
