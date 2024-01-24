import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
  showsService: ShowsService = inject(ShowsService)

  ngOnInit() {
    this.showsService.setSearchCategory('bookmarked shows')
  }
}
