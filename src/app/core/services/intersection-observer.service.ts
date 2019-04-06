import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class IntersectionObserverService {
  public observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          if (entry.target['callback'] && typeof entry.target['callback']  === 'function') entry.target['callback']();
          this.observer.unobserve(entry.target);
        }
      });
    });
  }

  public addElement(target: Element): void {
    if (this.observer) this.observer.observe(target);
  }

  public removeElement(target: Element): void {
    if (this.observer) this.observer.unobserve(target);
  }
}

