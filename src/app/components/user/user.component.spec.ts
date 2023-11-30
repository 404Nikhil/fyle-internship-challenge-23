import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/core/services/user.service';
import { UserRepositoryService } from 'src/app/core/services/user-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockUserService = {
    getUserByUserName: jasmine.createSpy('getUserByUserName').and.returnValue(of({ }))
  };

  const mockUserRepoService = {
    getRepositoriesOfTheUser: jasmine.createSpy('getRepositoriesOfTheUser').and.returnValue(of([]))
  };

  const mockActivatedRoute = {
    params: of({ userName: 'testUser' }),
    queryParams: of({ page: 1, per_page: 12 }),
    snapshot: {
      paramMap: convertToParamMap({ userName: 'testUser' }),
      queryParamMap: convertToParamMap({ page: 1, per_page: 12 })
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
        { provide: UserRepositoryService, useValue: mockUserRepoService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', () => {
    expect(mockUserService.getUserByUserName).toHaveBeenCalledWith('testUser');
    expect(component.user).toBeDefined();
  });

  it('should fetch repositories on init', () => {
    expect(mockUserRepoService.getRepositoriesOfTheUser).toHaveBeenCalledWith('testUser', 1, 12);
    expect(component.repos).toBeDefined();
  });

  it('should navigate to home on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

});
