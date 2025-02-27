import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  // let mockPlatformId: string;

  beforeEach(() => {
    // mockPlatformId = 'browser';

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    jest.restoreAllMocks();
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

      if (!error) {
        throw new Error('Error needs to be defined');
      }

      expect(error?.status).toEqual(400);
      expect(error?.error.message).toEqual('User already exists');
    });
  });

  describe('getUser', () => {
    it('should return user', () => {
      let user: User | undefined;
      service.getUser('test@test.com').subscribe({
        next: (res) => {
          user = res;
        },
      });

      let req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/getUser'
      );

      req.flush({ _id: '1', email: 'test@test.com' });

      expect(user).toEqual({ _id: '1', email: 'test@test.com' });
    });
  });

  describe('saveUserToLocalStorage', () => {
    it('should save user to localStorage if in browser', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthService,
          { provide: PLATFORM_ID, useValue: 'browser' }, // Simulate server environment
        ],
      });

      const authService = TestBed.inject(AuthService);

      const user: User = { _id: '1', email: 'test@test.com' };

      const localStorageMock = jest.spyOn(Storage.prototype, 'setItem');

      authService.saveUserToLocalStorage(user);

      expect(localStorageMock).toHaveBeenCalledWith(
        'user',
        JSON.stringify(user)
      );
    });

    it('should not call localStorage.setItem if not in browser', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthService,
          { provide: PLATFORM_ID, useValue: 'server' }, // Simulate server environment
        ],
      });

      const authService = TestBed.inject(AuthService);

      const user = { _id: '1', email: 'test@test.com' };

      const localStorageMock = jest.spyOn(Storage.prototype, 'setItem');

      authService.saveUserToLocalStorage(user);

      expect(localStorageMock).not.toHaveBeenCalled();
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

  describe('logout', () => {
    it('should return success message', () => {
      let msg: string | undefined;

      service.logout().subscribe({
        next: (res) => {
          msg = res.message;
        },
      });

      const req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/logout'
      );

      req.flush(
        { message: 'Logout Successful' },
        { status: 200, statusText: 'Ok' }
      );

      expect(msg).toEqual('Logout Successful');
    });
    it('should handle 500 error', () => {
      let error: HttpErrorResponse | undefined;

      service.logout().subscribe({
        next: () => {
          fail('Success should not run');
        },
        error: (errResp) => {
          error = errResp;
        },
      });

      const req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/user/logout'
      );

      expect(req.request.method).toEqual('POST');

      req.flush(
        { error: 'Server Error' },
        { status: 500, statusText: 'Server Error' }
      );

      expect(error?.status).toEqual(500);
      expect(error?.error.error).toEqual('Server Error');
    });
  });
});
