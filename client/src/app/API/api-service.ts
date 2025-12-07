import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl: string = "http://localhost:8080/api/v1/";

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  public setAuthToken(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  }

  registerUser(userData: any) :Observable<any>{
    return this.http.post(this.baseUrl + "auth/register/farmer", userData, this.httpOptions);
  }

  registerConsultant(userData: any) :Observable<any>{
    return this.http.post(this.baseUrl + "auth/register/consultant", userData);
  }
  
  login(userData: any) :Observable<any>{
    return this.http.post(this.baseUrl + "auth/login", userData, this.httpOptions);
  }

  isUserAlreadyExistst(username: string,role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/isUserAlreadyExist?username=${username}&role=${role}`);
  }

  /**
   * Farmer API endpoints
   */
  getFarmer(): Observable<any> {
    return this.http.get(this.baseUrl + "farmers/profile");
  }

  getConsultationsRequests(): Observable<any> {
    return this.http.get(this.baseUrl + "farmers/consultation/request/all");
  }

  updateFarmerProfile(farmerProfile:any){
    return this.http.put(this.baseUrl + "farmers/update",farmerProfile);
  }

  /*
   * Consultant API endpoints
   */
  getAllConsultants(): Observable<any> {
    return this.http.get(this.baseUrl + "admin/all/consultants");
  }

  /*
   * Admin API endpoints
  */
  verifyConsultant(username:string):Observable<any> {
    return this.http.post(`${this.baseUrl}admin/verify/consultant/${username}`,null);
  }

  
  //decode latitude and longitude
  getAddress(lat: number, lng: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

    return this.http.get(url, {
      headers: {
        'Accept-Language': 'en',           // Get English result
        'User-Agent': 'AngularApp/1.0'     // Required by Nominatim
      }
    });
  }
  
}
