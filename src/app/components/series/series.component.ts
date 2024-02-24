import { Component, inject, Signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesComponent {
  showsService: ShowsService = inject(ShowsService)
  shows: Signal<Shows[]> = this.showsService.shows
  series: Signal<Shows[]> = computed(() => this.shows().filter(show => show.category == "TV Series"))
  filteredSeries!: Shows[]

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading


  private unsubscribe = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.filterValue$.subscribe(newValue => {
      this.filteredSeries = this.series().filter((show) => show.title.includes(newValue))
    })

    this.showsService.setSearchCategory('TV series')
  }
}
