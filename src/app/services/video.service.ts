import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoUrl: string = ""
  videoTitle: string = ""
  videoYear!: number

  showVideo = new BehaviorSubject<boolean>(false)
  showVideo$ = this.showVideo.asObservable()

  constructor() { }

  setVideoUrl(url: string) {
    this.videoUrl = url
  }

  setVideoTitle(title: string) {
    this.videoTitle = title
  }

  setVideoYear(year: number) {
    this.videoYear = year
  }

  getVideoUrl(): string {
    return this.videoUrl
  }

  getVideoTitle(): string {
    return this.videoTitle
  }

  getVideoYear(): number {
    return this.videoYear
  }
}
