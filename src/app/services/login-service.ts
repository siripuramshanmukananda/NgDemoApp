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
  private apiUrl = environment.loginBaseUrl + '/api/Login/AddLoginCredentials';
  postLogin(data:any):Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

}
