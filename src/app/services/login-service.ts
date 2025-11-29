import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  constructor(private http: HttpClient) {
    
  }

  // postLoginData(data:any, id:any):Observable<any>{
  //   let params = new HttpParams()
  //   .set('id', id)
  //   .set('name', 'abc')
  //   return this.http.post(environment.baseUrl, data, {params});
  // }

  private loginApiUrl = environment.baseUrl + '/api/Login/LoginCredentials';
  postLogin(data:any): Observable<any>{
    return this.http.post(this.loginApiUrl, data);
  }

  private SendOtpApiUrl = environment.baseUrl + '/api/OTP/SendOTP';
  postSendOtp(data:any): Observable<any>{
    return this.http.post(this.SendOtpApiUrl, data);
  }

  private verifyOtpApiUrl =environment.baseUrl + '/api/OTP/VerifyOTP';
  postVerifyOtp(data:any): Observable<any>{
    return this.http.post(this.verifyOtpApiUrl, data);
  }  

  private getMembersApiUrl = environment.baseUrl + '/api/Member/GetAllMembers';
  getMembers(): Observable<any>{
    return this.http.get<any>(this.getMembersApiUrl);
  }

}
