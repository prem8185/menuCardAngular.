import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  
    constructor( private httpClient : HttpClient) { }

    saveLogin(login :Login):Observable<Object>{
      return this.httpClient.post<Object>('http://localhost:8081/my/login',login,{responseType:'json'});

  }


  
}
function throwError(arg0: string) {
  throw new Error('Function not implemented.');
}

