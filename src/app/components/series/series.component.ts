import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  showsService: ShowsService = inject(ShowsService)

  constructor() {
    this.showsService.setSearchCategory("TV series")
  }
}
