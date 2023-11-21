import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesNet } from '../Interface/InterfaceServ';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class serviceHTTPService {
  private myAppUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  get(header :HttpHeaders): Observable<ServicesNet[]> {
    debugger
    return this.http.get<ServicesNet[]>(this.myAppUrl+ 'User/GetUser', { headers: header });
     //return this.http.get<ServicesNet[]>(`${this.myAppUrl}${reference}`);
  }

  getId(id: number, header :HttpHeaders): Observable<any> {
    debugger

    return this.http.get<ServicesNet[]>(this.myAppUrl+ 'User/GetUserList/'+id,{ headers:header});
  }

  delete(id: number,reference: string,header :HttpHeaders): Observable<any> {
    debugger
    return this.http.delete<ServicesNet>(`${this.myAppUrl}${reference}${id}`, { headers: header });
  }

  addM(value: any,header :HttpHeaders): Observable<any> {
    debugger
    return this.http.post<void>(`${this.myAppUrl}${value.reference}`, value,{ headers: header });
    //return this.http.post<ServicesNet>(`${this.myAppUrl}${value.reference}`, value,{ headers: header });

  }

  update(id: number, value: ServicesNet,header :HttpHeaders): Observable<void> {
    debugger
    return this.http.put<void>(`${this.myAppUrl}${value.reference}`, value,{ headers: header });
  }
}
