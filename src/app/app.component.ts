import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'entertainment-web-app-angular';

  constructor(private router: Router, private videoService: VideoService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.videoService.closeVideo()
      }
    })
  }
}
