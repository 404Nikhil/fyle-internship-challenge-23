import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get user by username', inject(
    [HttpTestingController],
    (httpClient: HttpTestingController) => {
      const userName = 'exampleUser';
      const mockUserResponse = { login: userName, name: 'John Doe' };

      userService.getUserByUserName(userName).subscribe((user) => {
        expect(user).toEqual(mockUserResponse);
      });

      const req = httpTestingController.expectOne(`https://api.github.com/users/${userName}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserResponse);
    }
  ));

  it('should handle error and navigate to home', inject(
    [HttpTestingController],
    (httpClient: HttpTestingController) => {
      const userName = 'nonExistingUser';

      userService.getUserByUserName(userName).subscribe((user) => {
        expect(user).toBeNull();
      });

      const req = httpTestingController.expectOne(`https://api.github.com/users/${userName}`);
      expect(req.request.method).toBe('GET');
      req.flush({}, { status: 404, statusText: 'Not Found' });
    }
  ));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
  });

});
