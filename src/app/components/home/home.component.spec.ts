import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoService } from '../../services/video.service';
import { createMockShow } from '../../utils/test.utils';
import { By } from '@angular/platform-browser';

class MockShowsService {
  shows = signal<Shows[]>([]);
  filterValue = signal<string>('');
  isLoading = signal<boolean>(false);
  setSearchCategory = jest.fn();
  updateBookmark = jest.fn().mockImplementation(() => {
    return of([{ _id: 1, title: 'Koya', category: 'TV series' }]);
  });
  setFilterValue = jest.fn().mockImplementation((newFilterValue) => {
    this.filterValue.set(newFilterValue);
  });
}

class MockVideoService {
  playVideo = jest.fn();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let showsService: MockShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ShowsService, useClass: MockShowsService },
        { provide: VideoService, useClass: MockVideoService },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    showsService = TestBed.inject(ShowsService) as unknown as MockShowsService;

    fixture.detectChanges();
  });

  it('should render Home Component', () => {
    expect(component).toBeTruthy();
  });

  it('filters shows from filterValue', () => {
    showsService.shows.set([
      createMockShow({ _id: '1', category: 'TV Series', title: 'Koya' }),
      createMockShow({
        _id: '2',
        category: 'TV Series',
        title: 'The Terminator',
      }),
      createMockShow({
        _id: '3',
        category: 'Movie',
        title: 'Terminator returns',
      }),
    ]);

    showsService.filterValue.set('Ter');

    fixture.detectChanges();

    expect(component.filteredShows.length).toBe(2);
  });

  it('should toggle the isBookmarked property', () => {
    const show = createMockShow({
      _id: '1',
      title: 'Koya',
      isBookmarked: false,
    });

    component.toggleBookmark(show);

    expect(show.isBookmarked).toBe(true);

    component.toggleBookmark(show);

    expect(show.isBookmarked).toBe(false);
  });

  it('should call updateBookmark with the correct id', () => {
    const show = createMockShow({
      _id: '1',
      title: 'Koya',
      isBookmarked: false,
    });

    component.toggleBookmark(show);

    expect(showsService.updateBookmark).toHaveBeenCalledWith('1');
  });

  it('should filter trending shows correctly', () => {
    showsService.shows.set([
      createMockShow({ _id: '1', title: 'Koya', isTrending: true }),
      createMockShow({
        _id: '2',
        title: 'Lord of the rings',
        isTrending: false,
      }),
      createMockShow({
        _id: '3',
        title: 'Game of Thrones',
        isTrending: true,
      }),
    ]);

    expect(component.trendingShows().length).toBe(2);
    expect(component.trendingShows().map((show) => show.title)).toEqual([
      'Koya',
      'Game of Thrones',
    ]);
  });

  it('should filter recommended shows correctly', () => {
    showsService.shows.set([
      createMockShow({ _id: '1', title: 'Koya', isTrending: true }),
      createMockShow({
        _id: '2',
        title: 'Lord of the rings',
        isTrending: false,
      }),
      createMockShow({
        _id: '3',
        title: 'Game of Thrones',
        isTrending: true,
      }),
    ]);

    expect(component.recommendedShows().length).toBe(1);
    expect(component.recommendedShows().map((show) => show.title)).toEqual([
      'Lord of the rings',
    ]);
  });

  it('should show loading skeletons when isLoading is true', () => {
    component.isLoading.set(true);

    fixture.detectChanges();

    const skeletons = fixture.debugElement.queryAll(
      By.css('app-trending-skeleton,app-skeleton')
    );

    expect(skeletons.length).toBe(2);
  });

  it('should display shows if isLoading is false and filterValue is not empty', () => {
    showsService.shows.set([
      createMockShow({ _id: '1', title: 'Breaking bad' }),
      createMockShow({ _id: '2', title: 'Koya' }),
    ]);
    showsService.setFilterValue('break');
    component.isLoading.set(false);

    fixture.detectChanges();

    const shows = fixture.debugElement.query(By.css('app-shows-list'));

    expect(shows).toBeTruthy();

    const title = shows.attributes['title'];

    expect(title).toBe("Found 1 results for 'break'");
  });

  it('should display trending shows if isLoading is false and filterValue is empty', () => {
    component.isLoading.set(false);
    showsService.setFilterValue('');

    fixture.detectChanges();

    const trendingSection = fixture.debugElement.query(
      By.css('.trending-section')
    );

    expect(trendingSection).toBeTruthy();
  });
});
