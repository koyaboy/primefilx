import { Component, inject } from '@angular/core';
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
  movies: Shows[] = []
  // filterValue: string = ""
  filteredMovies: Shows[] = this.movies.filter((movie) => movie.title.includes(this.filterValue()))
  // isLoading!: boolean

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading

  private unsubscribe = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.movies = shows.filter((show) => show.category == "Movie")
    ])

    this.filterValue$.subscribe(newValue => {
      this.filteredMovies = this.movies.filter((movie) => movie.title.includes(newValue))
    })

    this.showsService.setSearchCategory('movies')
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
