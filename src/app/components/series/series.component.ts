import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  showsService: ShowsService = inject(ShowsService)
  series: Shows[] = []
  filteredSeries: Shows[] = []
  filterValue: string = ""
  isLoading!: boolean

  private unsubscribe = new Subject<void>();

  constructor() {
    this.showsService.filterValue$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((filter) => {
        this.filterValue = filter
        this.filteredSeries = this.series.filter((show) => show.title.includes(this.filterValue))
      })

    this.showsService.isLoading$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((loadingValue) => {
        this.isLoading = loadingValue
      })
  }

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.series = shows.filter((show) => show.category == "TV Series")
    ])
    this.showsService.setSearchCategory('TV series')
  }
}
