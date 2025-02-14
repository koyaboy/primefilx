import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  // describe('refreshToken', () => {
  //   it('makes expected calls', () => {
  //     const httpTestingController = TestBed.inject(HttpTestingController);
  //     service.refreshToken().subscribe(res => {
  //       expect(res).toEqual();
  //     });
  //     const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
  //     expect(req.request.method).toEqual('GET');
  //     req.flush();
  //     httpTestingController.verify();
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
