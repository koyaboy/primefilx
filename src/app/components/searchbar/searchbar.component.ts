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

  constructor() {

  }

  onSubmit(input: string) {
    // this.router.navigate([], { queryParams: { search: input } })
    this.showsService.filterShows(input)
  }
}
