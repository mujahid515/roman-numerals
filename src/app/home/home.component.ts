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

  constructor(private numeralsService: NumeralsService) { }

  ngOnInit(): void {
  }

  convert(event: any) {
    event.preventDefault();
    const value = this.inputValue.nativeElement.value;
    if(this.selectValue.nativeElement.value == 'numberToRoman') {
      this.numeralsService.normalNumbersToRomanNumerals(value).then((resp) => {
        console.log('Numeral: ', resp);
      }).catch((error) => {
        UIkit.modal.alert(error);
      });
    } else if(this.selectValue.nativeElement.value == 'romanToNumber') {
      this.numeralsService.romanNumeralsToNormalNumbers(value).then((resp) => {
        console.log('Number: ', resp);
      }).catch((error) => {
        UIkit.modal.alert(error);
      });
    }
  }

  convertNumeral(event: any) {
    event.preventDefault();
    const value = this.inputValue.nativeElement.value;
    this.numeralsService.normalNumbersToRomanNumerals(value).then((resp) => {
      console.log('resp: ', resp);
    }).catch((error) => {
      UIkit.modal.alert(error);
    });
  }

}
