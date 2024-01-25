import { Component, Input, Renderer2, inject } from '@angular/core';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent {
  @Input() title!: string
  @Input() Shows!: Shows[]

  renderer: Renderer2 = inject(Renderer2)

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked
  }
}
