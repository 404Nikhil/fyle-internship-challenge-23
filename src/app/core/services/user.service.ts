import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  getUserByUserName(userName: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${userName}`, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body;
          } else {
            this.router.navigate(['']);
            return null;
          }
        }),
        catchError((error: any) => {
          this.router.navigate(['']);
          return of(null);
        })
      );
  }
}
