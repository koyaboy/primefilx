import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trending-skeleton',
  templateUrl: './trending-skeleton.component.html',
  styleUrl: './trending-skeleton.component.css'
})
export class TrendingSkeletonComponent {
  @Input() title!: string
  Shows: string[] = new Array(6).fill("_")
}
