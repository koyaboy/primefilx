import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  showsService: ShowsService = inject(ShowsService)

  ngOnInit() {
    this.showsService.setSearchCategory('movies')
  }
}
