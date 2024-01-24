import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  router: Router = inject(Router)
  route: ActivatedRoute = inject(ActivatedRoute)
  showsService: ShowsService = inject(ShowsService)
  searchValue!: string
  category: string = ''


  constructor() {
    this.showsService.categoryValue.subscribe((categoryValue) => {
      this.category = categoryValue
    })
  }

  ngOnInit() { }

  updateSearchValue(value: string) {
    let arr = value.split(' ')

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "") {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase()
      }
    }

    let transformedValue = arr.join(' ')

    this.searchValue = transformedValue
    this.showsService.filterShows(this.searchValue)
  }
}
