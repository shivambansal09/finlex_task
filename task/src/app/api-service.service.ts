import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient: HttpClient) { }
  public get() {
    return this.httpClient.get(`http://dummy.restapiexample.com/api/v1/employees`);
  }
  public getSingle(id: number) {
    return this.httpClient.get(`http://dummy.restapiexample.com/api/v1/employee/` + id);
  }
  public post(value:any){
    return this.httpClient.post<any>(`http://dummy.restapiexample.com/api/v1/create`, value);
  }
  // public put(){
  //   return this.httpClient.put(`http://dummy.restapiexample.com/api/v1/update/21/`);
  // }
  public delete(id: number) {
    return this.httpClient.delete(`http://dummy.restapiexample.com/api/v1/delete/` + id);
  }
}
