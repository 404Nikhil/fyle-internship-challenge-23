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
    queryParams: of({ page: 1, per_page: 10 }),
    snapshot: {
      paramMap: convertToParamMap({ userName: 'testUser' }),
      queryParamMap: convertToParamMap({ page: 1, per_page: 10 })
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
    expect(mockUserRepoService.getRepositoriesOfTheUser).toHaveBeenCalledWith('testUser', 1, 10);
    expect(component.repos).toBeDefined();
  });

  it('should navigate to home on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });


  it('should reset page number to 1 on page size change', () => {
    component.perPage = 20; 
    component.changePerPage();
    expect(component.page).toBe(1);
  });

  it('should set upper limit for page number based on total repos count', () => {
    component.totalReposCount = 100;
    component.perPage = 10;
    component.changePerPage();
    expect(component.totalPages).toBe(10); 
    expect(component.page).toBe(1); 
  });

});
