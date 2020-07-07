import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  private url = "https://formspree.io/mleppwwy";
  postData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  constructor(private http: HttpClient) { }

  sendContactForm(name: string, email: string, subject: string, message: string) {
    
    this.postData.name = name;
    this.postData.email = email;
    this.postData.subject = subject;
    this.postData.message = message;
    this.http.post(this.url, this.postData).toPromise().then(data => {
      console.log(data);
    });
  }
}
