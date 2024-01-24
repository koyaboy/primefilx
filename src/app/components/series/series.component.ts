import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  showsService: ShowsService = inject(ShowsService)
  series: Shows[] = []

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.series = shows.filter((show) => show.category == "TV Series")
    ])
    this.showsService.setSearchCategory('TV series')
  }
}
