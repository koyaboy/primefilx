import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesComponent } from './series.component';
import { ShowsService } from '../../services/shows.service';
import { signal } from '@angular/core';
import { Shows } from '../../models/shows';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ShowsListComponent } from '../shows-list/shows-list.component';
import { VideoService } from '../../services/video.service';
import { of } from 'rxjs';
import { createMockShow } from '../../utils/test.utils';

class MockShowsService {
  // shows$ = of([{ title: 'Test Show', isBookmarked: true }]);
  shows = signal<Shows[]>([]);
  filterValue = signal<string>('');
  isLoading = signal<boolean>(false);
  setSearchCategory = jest.fn();
  setFilterValue = jest.fn().mockImplementation((value) => {
    this.filterValue.set(value);
  });
  // updateBookmark = jest.fn().mockImplementation((id: string) => {
  //   return of({ title: 'Test Show', isBookmarked: true });
  // });
}

class MockVideoService {
  playVideo = jest.fn();
}

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;
  let mockShowsService: MockShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesComponent, SkeletonComponent, ShowsListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ShowsService, useClass: MockShowsService },
        { provide: VideoService, useClass: MockVideoService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    mockShowsService = TestBed.inject(
      ShowsService
    ) as unknown as MockShowsService;

    // mockShowsService.shows.set([
    //   { _id: '1', category: 'TV Series', title: 'Koya' } as Partial<Shows>
    //   { _id: '2', category: 'TV Series', title: 'The Terminator' } as Shows,
    //   { _id: '3', category: 'Movie', title: 'Latest Movie' } as Shows,
    // ]);

    mockShowsService.shows.set([
      createMockShow({ _id: '1', category: 'TV Series', title: 'Koya' }),
      createMockShow({
        _id: '2',
        category: 'TV Series',
        title: 'The Terminator',
      }),
      createMockShow({ _id: '3', category: 'Movie', title: 'Latest Movie' }),
    ]);

    fixture.detectChanges();
  });

  it('work', () => {
    expect(component).toBeTruthy();
  });

  it('should filter TV Series from shows', () => {
    expect(component.series().length).toBe(2);
  });

  it('should filter TV series when filterValue is Passed', () => {
    mockShowsService.setFilterValue('Ko');

    fixture.detectChanges();

    expect(component.filteredSeries.length).toBe(1);
    expect(component.filteredSeries.map((show) => show.title)).toEqual([
      'Koya',
    ]);
  });

  it('should return all TV series when no filterValue is Passed', () => {
    mockShowsService.setFilterValue('');

    fixture.detectChanges;

    expect(component.filteredSeries.length).toBe(2);
  });

  it('should display skeleton loader when isLoading is true', () => {});

  it('should hide skeleton loader when isLoading is false', () => {});

  it('should return an empty array when shows is empty', () => {});

  it('should return an empty array when no shows match the filterValue', () => {});

  it('should render app-shows-list with filteredSeries when filterValue is not empty', () => {});

  it('should render app-shows-list with series when filterValue is empty', () => {});
});
