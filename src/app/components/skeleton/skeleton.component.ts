import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  @Input() title!: string
  Shows: string[] = new Array(12).fill("_")
}
