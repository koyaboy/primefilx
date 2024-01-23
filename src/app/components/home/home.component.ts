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

  ngOnInit() {
    this.showsService.getShows().subscribe(
      (data) => {
        this.shows = data
      }
    )
  }
}
