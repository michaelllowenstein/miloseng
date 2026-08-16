import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Applies contrast-safe text color to body-text containers
 * that would otherwise blend into dark backgrounds.
 *
 * Usage:
 *   <div appReadable>low-contrast paragraph text</div>
 *   <p appReadable="high">even brighter for hero subtext</p>
 *   <span appReadable="subtle">slightly boosted for captions</span>
 *
 * Pairs with the .readable-* classes in styles.css for
 * the actual color/opacity values — this directive just
 * applies the right class so you don't hunt for color mismatches
 * across 30 templates.
 */
@Directive({
  selector: '[appReadable]',
  standalone: true,
})
export class ReadableDirective implements OnInit {
  @Input() appReadable: 'default' | 'high' | 'subtle' | '' = '';

  private el = inject(ElementRef);

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;
    const variant = this.appReadable || 'default';

    // Remove any existing readable-* class to allow re-application
    nativeEl.classList.forEach(cls => {
      if (cls.startsWith('readable-')) nativeEl.classList.remove(cls);
    });

    nativeEl.classList.add(`readable-${variant}`);
  }
}