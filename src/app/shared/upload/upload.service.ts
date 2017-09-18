import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadService {

  constructor(private http: Http) { }

  makeFileRequest(url: string, fileList: Array<File>): Observable<any> {
    if (fileList.length > 0) {
      let formData: FormData = new FormData();
      for (var i = 0; i < fileList.length; i++) {
        formData.append("attach", fileList[i], fileList[i].name);
      }

      let headers = new Headers({
        'Accept': 'application/json'
      });
      var options = new RequestOptions({ headers: headers });
        
      return this.http.post(url, formData, options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    }
  }
}