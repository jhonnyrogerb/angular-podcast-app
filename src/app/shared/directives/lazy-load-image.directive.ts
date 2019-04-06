import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IntersectionObserverService} from '../../core/services/intersection-observer.service';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit, OnDestroy, OnChanges{
  public element: Element;

  @Input()
  appLazyLoadImage: string;
  el: ElementRef;

  constructor(private intersectionObserverService: IntersectionObserverService, el: ElementRef) {
    this.el = el;
  }

  public ngOnDestroy(): void {
    this.intersectionObserverService.removeElement(this.el.nativeElement);
  }


  public ngOnInit(): void {
    this.el.nativeElement['callback']  = () => {this.el.nativeElement.setAttribute('src', this.appLazyLoadImage); };
    this.intersectionObserverService.addElement(this.el.nativeElement);
  }


  public ngOnChanges(changes: SimpleChanges) {
      this.el.nativeElement['callback']  = () => {this.el.nativeElement.setAttribute('src', this.appLazyLoadImage); };
      this.intersectionObserverService.addElement(this.el.nativeElement);
  }
}
