import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videoUrl: string = ""
  constructor() { }

  setVideoUrl(url: string) {
    this.videoUrl = url
  }

  getVideoUrl() {
    return this.videoUrl
  }
}
