import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private getUrl = 'http://localhost:8081/my/gett/PREM001';

  constructor(private http: HttpClient) {}

  getDataFromBackend(storeUserData?: any): Observable<any> {
    const url = `${this.getUrl}`;
    let data = this.http.get(url);
    console.log('service data implmented  ' + data);
    return this.http.get(url);
  }

   saveType(typeData : any):Observable<any>{
    return this.http.post<any>('http://localhost:8081/my/create/PREM001',typeData)
   } 
   getType () : Observable<any>{
    return this.http.get<any>('http://localhost:8081/my/gett/PREM001');
   }



  
   deleteItem(item_id: string): Observable<any> {
    return this.http.delete(`http://localhost:8081/my/delete/${item_id}`);
  }





}
