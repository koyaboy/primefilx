import { fakeAsync, TestBed } from '@angular/core/testing';
import { ShowsService } from './shows.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Shows } from '../models/shows';
import { of } from 'rxjs';
import { createMockShow } from '../utils/test.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { tick } from '@angular/core/testing';

describe('ShowsService', () => {
  let showsService: ShowsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowsService],
    });
    showsService = TestBed.inject(ShowsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(showsService).toBeTruthy();
  });

  describe('fetch shows', () => {
    it('should fetch shows', () => {
      const mockShows = [
        createMockShow({ _id: '1', title: 'Koya' }),
        createMockShow({ _id: '2', title: 'Show' }),
      ];

      const httpMock = jest
        .spyOn(showsService.http, 'get')
        .mockImplementation(() => {
          return of(mockShows);
        });

      showsService.fetchShows();

      expect(httpMock).toHaveBeenCalledWith(showsService.apiUrl, {
        withCredentials: true,
      });

      expect(showsService.shows()).toEqual(mockShows);
      expect(showsService.isLoading()).toBe(false);
    });
  });

  describe('updateBookmark', () => {
    it('should return show that bookmark was updated', () => {
      let show: Partial<Shows> | undefined;

      showsService.updateBookmark('1').subscribe({
        next: (response) => {
          show = response;
        },
      });

      let req = httpTestingController.expectOne(
        'https://primeflix-api.onrender.com/shows/1'
      );

      expect(req.request.method).toEqual('PUT');

      req.flush({ _id: '1' });

      expect(show).toEqual({ _id: '1' });
    });

    // it('can test for 404 error', () => {
    //   let error: HttpErrorResponse | undefined;

    //   showsService.updateBookmark('1').subscribe({
    //     next: () => {
    //       fail('Success should not be called');
    //     },
    //     error: (err) => {
    //       error = err;
    //     },
    //   });

    //   let req = httpTestingController.expectOne(
    //     'https://primeflix-api.onrender.com/shows/1'
    //   );

    //   req.flush('Show not found', { status: 404, statusText: 'Not Found' });

    //   if (!error) {
    //     throw new Error('Error needs to be defined');
    //   }

    //   expect(error.status).toEqual(404);
    //   expect(error.message).toEqual('Show not found');
    // });
  });
});
