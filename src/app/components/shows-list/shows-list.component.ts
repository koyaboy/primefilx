import {
  Component,
  Input,
  inject,
  input,
  Output,
  EventEmitter,
  Signal,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';
import { Shows } from '../../models/shows';
import { ShowsService } from '../../services/shows.service';
import { VideoService } from '../../services/video.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { computed } from '@angular/core';

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

  constructor(
    private showsService: ShowsService,
    private videoService: VideoService
  ) {}

  // ngAfterViewInit() {
  //   const searchInput = document.querySelector(
  //     '#searchInput'
  //   ) as HTMLInputElement;
  //   if (searchInput) searchInput.focus();
  // }

  toggleBookmark(show: Shows) {
    this.showsService.toggleBookmark(show._id);
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
