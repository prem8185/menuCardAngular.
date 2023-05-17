import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor( private httpClient : HttpClient) { }
  saveRegistration(registration : FormData):Observable<any>{
    return this.httpClient.post<any>('http://localhost:8081/my/save',registration)
  }
}
