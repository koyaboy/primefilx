import { Component, Input, inject } from '@angular/core';
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

  showsService: ShowsService = inject(ShowsService)

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked

    this.showsService.updateBookmark(show._id).subscribe()

    if (this.title == "Bookmarked Movies" || this.title == "Bookmarked Series") {
      const index = this.Shows.indexOf(show)
      this.Shows.splice(index, 1)
    }

  }
}
