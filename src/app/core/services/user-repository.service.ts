import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Repo } from '../interfaces/Repo.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getRepositoriesOfTheUser(username: string, page: number, perPage: number): Observable<Repo[]> {
    const url = `${this.apiUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`;

    return this.http.get<Repo[]>(url);
  }

  getRepoLanguages(languagesUrl: string): Observable<any> {
    return this.http.get<any>(languagesUrl);
  }

  getRepositoriesWithLanguages(username: string, page: number, perPage: number): Observable<Repo[]> {
    // github blocks if rate limit exceeds 5 so check perpage is smaller than 5
    if(perPage>5){
      return this.getRepositoriesOfTheUser(username, page, perPage);
    }
    return this.getRepositoriesOfTheUser(username, page, perPage).pipe(
      switchMap((repos) => {
        const repoLanguageRequests = repos.map(repo => this.getRepoLanguages(repo.languages_url));
        return forkJoin(repoLanguageRequests).pipe(
          map(languagesArray => {
            repos.forEach((repo, index) => {
              repo.languages = Object.keys(languagesArray[index]);
            });
            return repos;
          })
        );
      })
    );
  }
}
