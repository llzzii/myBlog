import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private http: HttpClient) {}
  login(data, isCreate): Observable<any> {
    let url = "/api/login";
    if (isCreate && data["checkPassword"] !== undefined) {
      url = "/api/createUser";
    }
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  updateUser(data): Observable<any> {
    let url = "/api/updateUser";
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  getUser(username): Observable<any> {
    let url = "/api/getUser?username=" + username;
    return this.http.get(url).pipe(tap((response) => response));
  }
}
