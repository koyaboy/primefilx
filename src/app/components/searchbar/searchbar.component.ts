import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  router: Router = inject(Router)
  showsService: ShowsService = inject(ShowsService)
  searchValue: string = ''

  constructor() { }

  updateSearchValue(value: string) {
    this.searchValue = value
    this.showsService.filterShows(this.searchValue)
  }
}
