import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    VideoPlayerComponent,
  ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    RouterModule.forChild([
      {
        path: '',
        component: VideoPlayerComponent
      }
    ])
  ]
})
export class VideoPlayerModule { }
