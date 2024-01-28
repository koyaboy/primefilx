import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Shows } from '../../models/shows';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent {
  @Input() title!: string
  @Input() Shows!: Shows[]
  @Input() filterType!: string

  @Output() updatedShows = new EventEmitter<Shows[]>();


  showsService: ShowsService = inject(ShowsService)

  ngOnInit() {
    this.Shows = this.Shows.filter((show) => show.isBookmarked)
  }

  updateBookmarkedShows(): void {
    let newBookmarkedShows: Shows[] = []
    this.showsService.getShows().subscribe((shows) => {
      newBookmarkedShows = shows.filter((show) => show.isBookmarked)
      this.updatedShows.emit(newBookmarkedShows)
    })
  }

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked

    if (this.title == "Bookmarked Movies" || this.title == "Bookmarked Series" || this.filterType == "bookmark-filter") {
      this.showsService.updateBookmark(show._id).subscribe(() => {
        this.updateBookmarkedShows()
      })

      const index = this.Shows.indexOf(show)
      this.Shows.splice(index, 1)
    }

    else {
      this.showsService.updateBookmark(show._id).subscribe()
    }
  }

}
