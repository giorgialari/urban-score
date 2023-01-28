import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('isAuthenticated should be false', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
