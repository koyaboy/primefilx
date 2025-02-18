import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('makes expected calls', () => {
      let user: User | undefined;
      service.login('test@test.com', 'pwd').subscribe({
        next: (res: User) => {
          user = res;
        },
      });

      expect(service.isLoggingIn()).toBe(true);

      let req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/login'
      );

      expect(req.request.body).toEqual({
        email: 'test@test.com',
        password: 'pwd',
      });

      req.flush({ _id: '1', email: 'test@test.com' });

      expect(user).toEqual({ _id: '1', email: 'test@test.com' });

      expect(service.isLoggingIn()).toBe(false);
    });
  });

  describe('signup', () => {
    it('return user upon successful signup', () => {
      let newUser: User | undefined;

      service.signup('test@test.com', 'pwd').subscribe({
        next: (res: User) => {
          newUser = res;
        },
      });

      expect(service.isSigningUp()).toBe(true);

      let req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/register'
      );

      req.flush({ _id: '1', email: 'test@test.com' });

      expect(service.isSigningUp()).toBe(false);
      expect(newUser).toEqual({ _id: '1', email: 'test@test.com' });
    });

    it('should handle 404 error', () => {
      let error: HttpErrorResponse | undefined;

      service.signup('test@test.com', 'pwd').subscribe({
        next: (res: User) => {
          fail('Success should not be claled');
        },
        error: (errResp) => {
          error = errResp;
        },
      });

      let req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/register'
      );

      req.flush(
        { message: 'User already exists' },
        {
          status: 400,
          statusText: 'Not Found',
        }
      );

      expect(error?.status).toEqual(400);
      expect(error?.error.message).toEqual('User already exists');
    });
  });

  // describe('refreshToken', () => {
  //   it('makes expected calls', () => {
  //     const httpTestingController = TestBed.inject(HttpTestingController);
  //     service.refreshToken().subscribe(res => {
  //       expect(res).toEqual();
  //     });
  //     const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
  //     expect(req.request.method).toEqual('GET');
  //     req.flush({token});
  //   });
  // });

  // describe('logout', () => {
  //   it('makes expected calls', () => {
  //     const httpTestingController = TestBed.inject(HttpTestingController);
  //     service.logout().subscribe(res => {
  //       expect(res).toEqual();
  //     });
  //     const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
  //     expect(req.request.method).toEqual('POST');
  //     req.flush();
  //     httpTestingController.verify();
  //   });
  // });
});
