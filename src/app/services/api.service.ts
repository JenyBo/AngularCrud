import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postPhone(data : any){
    return this.http.post<any>("http://localhost:3000/phoneList/",data);
  }

  getPhone(){
    return this.http.get<any>("http://localhost:3000/phoneList/");
  }

  putPhone(data : any , id : number){
    return this.http.put<any>("http://localhost:3000/phoneList/" + id,data);
  }

  deletePhone(id:number){
    return this.http.delete<any>("http://localhost:3000/phoneList/" + id);
}

}
