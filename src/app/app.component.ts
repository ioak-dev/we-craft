import { Component } from "@angular/core";
import * as exampleData from "../assets/we-craft DemoSurvey V1.json";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "we-craft";
  data: any;
  selectedValue = "Yes";
  chatData: any = [
    {
      "id": "",
      "questionId": "",
      "sender": "assistant",
      "content": "Could you please provide more specifics about the cabs? For instance, their maximum load capacity, size, and, if applicable, their type or model. In addition, for the 7.5-tonne rigid trucks, could you provide details such as their maximum volume capacity and model?"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "user",
      "content": "The cabs do not have capacity - they are the power unit which move the trailers. The trailers cannot move on their own.The 7.5 tonne trucks are 1. 30cbm"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "assistant",
      "content": "Thank you for the additional information.For our records, could you provide more information on the make and model of the cabs, the trailers, and the 7.5 - tonne trucks? Also, are there any special features or capabilities in these trucks or trailers that are noteworthy or regularly used in your operations?"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "user",
      "content": "Make isn't important. Some of the trailers have tail lifts"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "assistant",
      "content": "Thank you for sharing that. Does the tail lift feature on some of your trailers provide any enhanced functionality for your operations? How frequent are such trailers with tail lifts used in comparison to normal trailers in your fleet? And for the 7.5 tonne trucks, apart from their maximum volume capacity of 30cbm, are there any unique features or functionality they present?"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "user",
      "content": "All the 7.5T trucks have tail lifts. We don't use them with the trailers. This means that we can unload the smaller trucks where there is no trailer dock available."
    },
    {
      "id": "",
      "questionId": "",
      "sender": "assistant",
      "content": "I see, so the 7.5 tonne trucks with tail lifts are used in areas without trailer docks available, this makes your fleet quite versatile. Is there any other detail youd like to add, such as if any of your vehicles have specific roles or are specialized for certain types of deliveries? Also, could you provide any information about the age of these trucks and their condition, maintenance, and efficiency status?"
    },
    {
      "id": "",
      "questionId": "",
      "sender": "user",
      "content": "Clarify as bullet points"
    }
  ];
  chatInput: string = '';
  showChatInput: boolean = false;

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

  toggleChatInput() {
    this.showChatInput = true;
  }
}
