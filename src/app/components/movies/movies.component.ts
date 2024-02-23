import { Component, computed, inject, Signal } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  showsService: ShowsService = inject(ShowsService)

  shows: Signal<Shows[]> = this.showsService.shows
  movies: Signal<Shows[]> = computed(() => this.shows().filter(show => show.category == "Movie"))
  filteredMovies!: Shows[]
  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading

  constructor() { }

  ngOnInit() {
    this.filterValue$.subscribe(newValue => {
      this.filteredMovies = this.movies().filter((movie) => movie.title.includes(newValue))
    })

    this.showsService.setSearchCategory('movies')
  }
}
