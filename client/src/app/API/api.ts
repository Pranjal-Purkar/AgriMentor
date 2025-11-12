import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class API {
  private baseUrl = "http://localhost:5000/"

  private constructor(private http:HttpClient) {

  }

  registerUser(userData: any) :Observable<any>{
    return this.http.post(this.baseUrl + "users", userData)
  }
}
