import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  private SERVER_URL = environment.SERVER_URL;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  getAllApplicantsInfo() {
    return this.http.get<[]>(this.SERVER_URL + '/parseApplicants', this.noAuthHeader);
  }

  submitQuestions(createBody): any {
    return this.http.post(`${this.SERVER_URL}/addQuestions`, createBody);
  }

}
