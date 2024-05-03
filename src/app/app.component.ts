import { Component, OnInit } from "@angular/core";
import * as surveyFormData from "../assets/wecraft_survey.json";
import { HttpService } from "./http.service";

export interface IChat {
  id?: string,
  questionId: string,
  sender: string
  content: string,
  createdBy?: null,
  createdDate?: Date,
  lastModifiedBy?: null,
  lastModifiedDate?: Date
}

export interface IQuestion {
  id: string,
  surveyId: string,
  sectionId: string,
  questionHeader: string,
  questionSubTitle: string,
  aiRelevant: boolean,
  questionType: string,
  options: string[],
  questionResponse: string,
  questionResponseList: string[],
  createdBy?: null,
  createdDate?: Date,
  lastModifiedBy?: null,
  lastModifiedDate?: Date
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "we-craft";
  formData: any;
  selectedValue = "Yes";
  file: any = null; // Variable to store file to Upload
  chatData: IChat[] = [];
  chatInput: string = '';
  showChatInput: boolean = false;
  surveyId: string = '6634d1a43900c03319d40d2e';
  selectedQuestion: IQuestion = {
    id: "",
    surveyId: "",
    sectionId: "",
    questionHeader: "",
    questionSubTitle: "",
    aiRelevant: false,
    questionType: "",
    options: [],
    questionResponse: "",
    questionResponseList: []
  };

  constructor(private httpService: HttpService) {
    console.log(surveyFormData);
    // this.formData = surveyFormData;
  }

  ngOnInit(): void {
    this.getSurveyDetails();
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0] as File;
    this.onUpload();
  }

  // OnClick of button Upload
  onUpload() {
    if (this.file) {
      console.log(this.file);
      this.httpService.uploadJson(this.file).subscribe({
        next: (result) => {
          this.surveyId = result.surveyId;
          console.log(this.surveyId);
          this.getSurveyDetails();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  getSurveyDetails() {
    this.httpService.getSurveyById(this.surveyId).subscribe({
      next: (result) => {
        console.log(result);
        this.formData = result.survey;
        console.log(this.formData);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleSelection(e: any, items: any, i: number, response: string[]): void {
    if (e.target.checked && !response.some(x => x == items[i])) {
      response.push(items[i]);
    } else if (!e.target.checked) {
      response.splice(response.indexOf(items[i]), 1);
    }
  }

  saveQuestionResponse(question: IQuestion) {
    console.log(question);
    this.httpService.saveQuestionResponsebyQuestionId(question.id, question).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getChatsByQuestionId(question: IQuestion) {
    this.selectedQuestion = question;
    this.httpService.getChatMessagesByQuestionId(question.id).subscribe({
      next: (result) => {
        this.chatData = result;
        console.log(this.chatData);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateChatByQuestionId(question: IQuestion) {
    const obj: IChat = {
      questionId: question.id,
      sender: "user",
      content: question.questionResponse
    };
    this.httpService.updateChatByQuestionId(obj).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    console.log(this.formData.default);
  }

  saveChat() {
    console.log(this.formData.default);
  }

  sendUserChat() {
    const obj: IChat = {
      questionId: this.selectedQuestion.id,
      sender: "user",
      content: this.chatInput
    };
    this.httpService.updateChatByQuestionId(obj).subscribe({
      next: (result) => {
        console.log(result);
        this.chatInput = '';
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleChatInput() {
    this.showChatInput = true;
  }
}
