import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    const overlayStub = () => ({ create: arg => ({}) });
    TestBed.configureTestingModule({
      providers: [VideoService, { provide: Overlay, useFactory: overlayStub }]
    });
    service = TestBed.inject(VideoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
