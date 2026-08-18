import {
  DestroyRef,
  Directive,
  EffectRef,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  Signal,
  effect,
  inject,
  input,
} from '@angular/core';

import { CmsService } from '@services/cms';

@Directive({
  selector: '[cmsField]',
  standalone: true,
})
export class CmsFieldDirective implements OnInit, OnDestroy {
  private readonly cms = inject(CmsService);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  /**
   * RTDB document-like path under CONTENT_ROOT.
   *
   * Example:
   *   cmsPath="landing/hero"
   */
  readonly cmsPath = input.required<string>();

  /**
   * Scalar property inside the path.
   *
   * Example:
   *   cmsField="headlineAccent"
   */
  readonly cmsField = input.required<string>();

  /**
   * Optional explicit fallback.
   *
   * When omitted, the directive captures the element's checked-in textContent
   * before the realtime subscription is attached.
   */
  readonly cmsFallback = input<string | null>(null);

  private value?: Signal<string>;
  private renderEffect?: EffectRef;

  ngOnInit(): void {
    const fallback =
      this.cmsFallback() ??
      this.element.nativeElement.textContent?.trim() ??
      '';

    this.value = this.cms.fieldSignal(
      this.cmsPath(),
      this.cmsField(),
      fallback,
      this.destroyRef,
    );

    this.renderEffect = effect(
      () => {
        this.renderer.setProperty(
          this.element.nativeElement,
          'textContent',
          this.value?.() ?? fallback,
        );
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.renderEffect?.destroy();
  }
}
