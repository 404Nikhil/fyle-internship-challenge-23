import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repo } from 'src/app/core/interfaces/Repo.interface';
import { User } from 'src/app/core/interfaces/User.interface';
import { UserRepositoryService } from 'src/app/core/services/user-repository.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user!: User;
  userName!: string;
  repos!: Repo[] | [];
  page: number = 1;
  perPage: number = 12;
  totalCount!: number;
  totalPages: number = 1;
  currentPageArray: number[] = [];
  loading: boolean = true;

  perPageControl = new FormControl(this.perPage);


  constructor(
    private router: Router,
    private activatedRoutes: ActivatedRoute,
    private userService: UserService,
    private userRepoService: UserRepositoryService
  ) {}

  ngOnInit() {
    this.activatedRoutes.params.subscribe((params: any) => {
      if (params && params['userName']) {
        this.userName = params['userName'];
        this.userService.getUserByUserName(this.userName).subscribe((data: any) => {
          if (data === null) {
            window.alert('User not found');
          } else {
            this.user = data;
            this.totalCount = this.user.public_repos;
            this.totalPages = Math.ceil(this.totalCount / this.perPage);
            this.generateCurrentPageArray();
            this.fetchRepositories();
          }
        });
      }
    });

    this.activatedRoutes.queryParams.subscribe((params: any) => {
      if (params && params['page']) {
        this.page = parseInt(params['page']);
      } else {
        this.page = 1;
      }
      if (params['per_page']) {
        this.perPage = parseInt(params.per_page);
      }
    });

    this.activatedRoutes.queryParams.subscribe((params: any) => {
      if (params && params['page']) {
        this.page = parseInt(params['page']);
      } else {
        this.page = 1;
      }
      if (params['per_page']) {
        this.perPage = parseInt(params.per_page);
        this.perPageControl.setValue(this.perPage);
      }
    });

    // Listen to changes in the perPageControl value
    this.perPageControl.valueChanges.pipe(debounceTime(300)).subscribe((value: any) => {
      this.perPage = value;
      this.fetchRepositories();
    });

  }

  changePerPage() {
    this.fetchRepositories();
  }

  changePage(newPage: number) {
    if (this.page !== newPage) {
      this.page = newPage;
      this.generateCurrentPageArray();
      this.fetchRepositories();
    }
  }

  goBack() {
    this.router.navigate(['']);
  }

  private fetchRepositories() {
    this.loading = true; // Set loading to true when fetching repos
    this.userRepoService
      .getRepositoriesWithLanguages(this.userName, this.page, this.perPage)
      .subscribe((repos: Repo[]) => {
        this.repos = repos;
        this.loading = false; // Set loading to false after fetching repos
      });
  }

  generateCurrentPageArray() {
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, this.page + 2);

    this.currentPageArray = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
