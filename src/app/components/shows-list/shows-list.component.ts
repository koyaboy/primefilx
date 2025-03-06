import {
  Component,
  Input,
  inject,
  Output,
  EventEmitter,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Shows } from '../../models/shows';
import { ShowsService } from '../../services/shows.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowsListComponent {
  @Input() title!: string;
  @Input() Shows!: Shows[];
  @Input() filterType!: string;

  @Output() updatedShows = new EventEmitter<Shows[]>();

  constructor(
    private showsService: ShowsService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    if (
      this.title == 'Bookmarked Movies' ||
      this.title == 'Bookmarked Series'
    ) {
      this.Shows = this.Shows.filter((show) => show.isBookmarked);
    }
  }

  ngAfterViewInit() {
    const searchInput = document.querySelector(
      '#searchInput'
    ) as HTMLInputElement;
    if (searchInput) searchInput.focus();
  }

  updateBookmarkedShows(): void {
    let newBookmarkedShows: Shows[] = [];
    this.showsService.shows$.subscribe((shows) => {
      newBookmarkedShows = shows.filter((show) => show.isBookmarked);
      this.updatedShows.emit(newBookmarkedShows);
    });

    newBookmarkedShows = this.showsService
      .shows()
      .filter((show) => show.isBookmarked);
    this.updatedShows.emit(newBookmarkedShows);
  }

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked;

    if (
      this.title == 'Bookmarked Movies' ||
      this.title == 'Bookmarked Series' ||
      this.filterType == 'bookmark-filter'
    ) {
      this.showsService.updateBookmark(show._id).subscribe(() => {
        this.updateBookmarkedShows();
      });

      const index = this.Shows.indexOf(show);
      this.Shows.splice(index, 1);
    } else {
      this.showsService.updateBookmark(show._id).subscribe();
    }
  }

  playVideo(id: string, videoUrl: string, showTitle: string, showYear: number) {
    this.videoService.playVideo(id, videoUrl, showTitle, showYear);
  }

  handleKeydown(
    event: KeyboardEvent,
    id: string,
    videoUrl: string,
    showTitle: string,
    showYear: number
  ) {
    if (event.key == 'Enter') {
      this.playVideo(id, videoUrl, showTitle, showYear);
    }
  }
}
