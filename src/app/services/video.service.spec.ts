import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;
  let overlayStub: { create: jest.Mock };
  let overlayRefStub: { attach: jest.Mock };

  beforeEach(() => {
    overlayRefStub = { attach: jest.fn() }; // Mock the attach method
    overlayStub = { create: jest.fn(() => overlayRefStub) }; // Ensure create() returns overlayRefStub

    TestBed.configureTestingModule({
      providers: [VideoService, { provide: Overlay, useValue: overlayStub }],
    });
    service = TestBed.inject(VideoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('plays video', () => {
    service.playVideo('1', '/video', 'koya', 2023);

    expect(overlayStub.create).toHaveBeenCalled();
    expect(overlayRefStub.attach).toHaveBeenCalled();
  });
});
