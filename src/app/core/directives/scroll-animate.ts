import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() appScrollAnimate: 'up' | 'left' = 'up';
  @Input() animateDelay = 0;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    const hiddenClass = this.appScrollAnimate === 'left' ? 'scroll-hidden-left' : 'scroll-hidden';
    const visibleClass = this.appScrollAnimate === 'left' ? 'scroll-visible-left' : 'scroll-visible';

    nativeEl.classList.add(hiddenClass);

    if (this.animateDelay > 0) {
      nativeEl.style.transitionDelay = `${this.animateDelay}s`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nativeEl.classList.add(visibleClass);
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
