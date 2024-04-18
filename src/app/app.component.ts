import { Component } from '@angular/core';
import * as exampleData from '../assets/we-craft DemoSurvey V1.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'we-craft';
  data: any;
  selectedValue = "Yes";

  constructor() {
    console.log(exampleData);
    this.data = exampleData;
  }

  toggleSelection(e: any, items: any, i: number, response: string[]): void {
    if (e.target.checked && !response.some(x => x == items[i])) {
      response.push(items[i]);
    } else if (!e.target.checked) {
      response.splice(response.indexOf(items[i]), 1);
    }
  }

  onSubmit() {
    console.log(this.data.default);
  }
}
