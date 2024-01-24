import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  showsService: ShowsService = inject(ShowsService)
  shows: Shows[] = []
  recommendedShows: Shows[] = []
  trendingShows: Shows[] = []
  filteredShows: Shows[] = []
  filterValue: string = ""

  constructor() {
    this.showsService.filterValue.subscribe((filter) => {
      this.filterValue = filter
      this.filteredShows = this.shows.filter((show) => show.title.includes(filter))
    })
  }

  ngOnInit() {
    this.showsService.getShows().subscribe(
      (data) => {
        this.shows = data

        this.recommendedShows = this.shows.filter((show) => show.isTrending == false)
        this.trendingShows = this.shows.filter((show) => show.isTrending == true)
      }
    )
  }
}
