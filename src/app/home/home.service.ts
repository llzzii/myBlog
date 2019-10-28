import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" }),
};

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}
  login(data, isCreate): Observable<any> {
    let url = "/api/user/login";
    if (isCreate && data["checkPassword"] !== undefined) {
      url = "/api/createUser";
    }
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  updateUser(data): Observable<any> {
    let url = "/api/updateUser";
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  getUser(username = ""): Observable<any> {
    let url = "/api/user/getUser?username=" + username;
    return this.http.get(url).pipe(tap((response) => response));
  }
  getTags(): Observable<any> {
    let url = "/api/user/getTags";
    return this.http.get(url).pipe(tap((response) => response));
  }
  addTag(tag): Observable<any> {
    let url = "/api/addTag";
    let data = {};
    data["tags"] = tag;
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  addBlogs(blogData): Observable<any> {
    let url = "/api/addBlog";
    return this.http.post(url, JSON.stringify(blogData), httpOptions).pipe(tap((response) => response));
  }

  getBlogs(current): Observable<any> {
    let url = "/api/user/getBlogList?current=" + current;
    return this.http.get(url).pipe(tap((response) => response));
  }
  getNewsBlogs(): Observable<any> {
    let url = "/api/user/getNewsBlog";
    return this.http.get(url).pipe(tap((response) => response));
  }
  addComent(data): Observable<any> {
    let url = "/api/addComment";
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  getComment(blog_id): Observable<any> {
    let url = "/api/user/getComment?id=" + blog_id;
    return this.http.get(url).pipe(tap((response) => response));
  }
  addLike(data): Observable<any> {
    let url = "/api/addLiker";
    return this.http.post(url, JSON.stringify(data), httpOptions).pipe(tap((response) => response));
  }
  deleteLike(data): Observable<any> {
    let url = "/api/deleteLiker?comment_id=" + data.comment_id;
    return this.http.delete(url).pipe(tap((response) => response));
  }
  getBlogDetail(blog_id): Observable<any> {
    let url = "/api/user/getBlogDetail?id=" + blog_id;
    return this.http.get(url).pipe(tap((response) => response));
  }
}
