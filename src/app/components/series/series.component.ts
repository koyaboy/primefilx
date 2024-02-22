import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  showsService: ShowsService = inject(ShowsService)
  series: Shows[] = []
  filteredSeries: Shows[] = this.series.filter((show) => show.title.includes(this.filterValue()))
  // filterValue: string = ""
  // isLoading!: boolean

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading


  private unsubscribe = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.series = shows.filter((show) => show.category == "TV Series")
    ])

    this.filterValue$.subscribe(newValue => {
      this.filteredSeries = this.series.filter((show) => show.title.includes(newValue))
    })

    this.showsService.setSearchCategory('TV series')
  }
}
