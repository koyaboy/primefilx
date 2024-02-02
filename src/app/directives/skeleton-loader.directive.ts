import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSkeletonLoader]'
})
export class SkeletonLoaderDirective {

  @Input() set appSkeletonLoader(isLoading: boolean) {
    if (isLoading) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
    else {
      this.viewContainer.clear()
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

}
