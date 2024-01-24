import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  showsService: ShowsService = inject(ShowsService)
  movies: Shows[] = []

  constructor() {
  }
  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.movies = shows.filter((show) => show.category == "Movie")
    ])
    this.showsService.setSearchCategory('movies')
  }
}
