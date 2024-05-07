import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient) { }

  uploadJson(fileData: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileData, fileData?.name);
    return this.http
      .post(`${this.baseurl}/survey/upload`, formData)
      .pipe(map((response) => response));
  }

  getSurveyById(surveyId: string): Observable<any> {
    return this.http
      .get(`${this.baseurl}/survey/details/${surveyId}`, httpOptions)
      .pipe(map((response) => response));
  }

  saveQuestionResponsebyQuestionId(questionId: string, response: any) {
    return this.http
      .put(`${this.baseurl}/question/${questionId}`, response)
      .pipe(map((response) => response));

  }

  getChatMessagesByQuestionId(questionId: string): Observable<any> {
    return this.http
      .get(`${this.baseurl}/question/message/${questionId}`, httpOptions)
      .pipe(map((response) => response));
  }

  updateChatByQuestionId(object: any) {
    return this.http
      .post(`${this.baseurl}/message/chatgpt`, object)
      .pipe(map((response) => response));
  }

  clearChatMessagesByQuestionId(questionId: string) {
    return this.http
      .delete(`${this.baseurl}/question/message/${questionId}`, httpOptions)
      .pipe(map((response) => response));
  }
}
