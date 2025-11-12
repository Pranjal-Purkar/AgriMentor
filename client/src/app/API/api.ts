import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseUrl = "http://localhost:8080/api/v1/"

  private constructor(private http:HttpClient) {

  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public setAuthToken(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  }

  registerUser(userData: any) :Observable<any>{
    return this.http.post(this.baseUrl + "auth/register", userData, this.httpOptions);
  }
}
