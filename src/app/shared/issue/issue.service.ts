import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class IssueService {

  options: RequestOptions;

  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('auth_token')
    });
    this.options = new RequestOptions({ headers: headers });
  }

  loadDataDDL(): Observable<any[]> {
    return this.http.get(`${environment.remoteAPI}/api/v1/issue/getDataDDL`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  loadIssueBy(id): Observable<any[]> {
    return this.http.get(`${environment.remoteAPI}/api/v1/issue/getIssueBy/${id}`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  onSearchData(body) {
    return this.http.post(`${environment.remoteAPI}/api/v1/issue/search`, body, this.options)
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  loadDataById(id): Observable<any> {
    return this.http.get(`${environment.remoteAPI}/api/v1/issue/findByID/${id}`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addItem(body): Observable<any> {
    return this.http.post(`${environment.remoteAPI}/api/v1/issue`, body, this.options)
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${environment.remoteAPI}/api/v1/issue/${id}`, this.options)
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateItem(id, body): Observable<any> {
    return this.http.put(`${environment.remoteAPI}/api/v1/issue`, body, this.options)
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}