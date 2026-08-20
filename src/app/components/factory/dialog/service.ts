import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  PLATFORM_ID,
  Type,
  createComponent,
  createEnvironmentInjector,
  inject,
} from '@angular/core';

import { DIALOG_CLOSE_FN, DIALOG_DATA } from './tokens';

export interface DialogRef<R = unknown> {
  close(result?: R): void;
  closed: Promise<R | undefined>;
}

export interface DialogOptions<D = unknown> {
  data?: D;
  bare?: boolean;
  disableClose?: boolean;
  disableEscape?: boolean;
  panelClass?: string;
}

const CLS_OPEN = 'animate-dialog-in';
const CLS_CLOSE = 'animate-dialog-out';
const ANIM_DURATION_MS = 160;

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly rootInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private openCount = 0;

  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    options: DialogOptions<D> = {},
  ): DialogRef<R> {
    if (!isPlatformBrowser(this.platformId)) {
      return {
        close: () => undefined,
        closed: Promise.resolve(undefined),
      };
    }

    const overlay = this.createOverlay(options);
    const host = this.document.createElement('div');
    host.style.display = 'contents';
    overlay.appendChild(host);
    this.document.body.appendChild(overlay);

    if (!options.bare) {
      this.lockScroll();
    }

    let resolveClosed!: (value: R | undefined) => void;
    const closed = new Promise<R | undefined>(resolve => {
      resolveClosed = resolve;
    });

    let settled = false;
    let destroyed = false;
    let componentRef: ReturnType<typeof createComponent<C>> | undefined;
    let childInjector: EnvironmentInjector | undefined;

    const cleanup: Array<() => void> = [];

    const destroy = (result?: R): void => {
      if (destroyed) return;
      destroyed = true;

      for (const fn of cleanup.splice(0)) fn();

      if (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }

      childInjector?.destroy();
      overlay.remove();

      if (!options.bare) {
        this.unlockScroll();
      }

      resolveClosed(result);
    };

    const close = (result?: R): void => {
      if (settled) return;
      settled = true;

      overlay.classList.remove(CLS_OPEN);
      overlay.classList.add(CLS_CLOSE);

      window.setTimeout(
        () => destroy(result),
        ANIM_DURATION_MS,
      );
    };

    try {
      childInjector = createEnvironmentInjector(
        [
          { provide: DIALOG_DATA, useValue: options.data },
          { provide: DIALOG_CLOSE_FN, useValue: close },
        ],
        this.rootInjector,
      );

      componentRef = createComponent(component, {
        environmentInjector: childInjector,
        hostElement: host,
      });

      this.appRef.attachView(componentRef.hostView);

      // Required for dynamically created views in this zoneless application.
      componentRef.changeDetectorRef.detectChanges();

      if (!options.disableClose) {
        const onOverlayClick = (event: MouseEvent): void => {
          if (event.target === overlay) {
            close();
          }
        };

        overlay.addEventListener('click', onOverlayClick);
        cleanup.push(() =>
          overlay.removeEventListener('click', onOverlayClick),
        );
      }

      const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && !options.disableEscape) {
          event.preventDefault();
          close();
          return;
        }

        if (event.key === 'Tab' && !options.bare) {
          trapFocus(event, overlay);
        }
      };

      this.document.addEventListener('keydown', onKeyDown);
      cleanup.push(() =>
        this.document.removeEventListener('keydown', onKeyDown),
      );

      const previouslyFocused =
        this.document.activeElement instanceof HTMLElement
          ? this.document.activeElement
          : null;

      cleanup.push(() => previouslyFocused?.focus?.());

      requestAnimationFrame(() => {
        getFirstFocusable(overlay)?.focus();
      });

      return { close, closed };
    } catch (error) {
      console.error('[DialogService] Failed to open dialog', {
        component: component.name,
        error,
      });

      settled = true;
      destroy();
      throw error;
    }
  }

  private createOverlay<D>(
    options: DialogOptions<D>,
  ): HTMLDivElement {
    const overlay = this.document.createElement('div');

    overlay.dataset['dialogOverlay'] = 'true';
    overlay.setAttribute(
      'role',
      options.bare ? 'presentation' : 'dialog',
    );

    if (!options.bare) {
      overlay.setAttribute('aria-modal', 'true');
    }

    overlay.className = options.bare
      ? 'fixed inset-0 z-[9998]'
      : [
          'fixed inset-0 z-[9998]',
          'bg-black/60 backdrop-blur-sm',
          'flex items-center justify-center p-4',
          CLS_OPEN,
          options.panelClass ?? '',
        ].filter(Boolean).join(' ');

    return overlay;
  }

  private lockScroll(): void {
    this.openCount++;
    if (this.openCount !== 1) return;

    const scrollY = window.scrollY;
    this.document.body.dataset['dialogScrollY'] = String(scrollY);
    this.document.body.style.position = 'fixed';
    this.document.body.style.top = `-${scrollY}px`;
    this.document.body.style.width = '100%';
    this.document.body.style.overflowY = 'scroll';
  }

  private unlockScroll(): void {
    this.openCount = Math.max(0, this.openCount - 1);
    if (this.openCount !== 0) return;

    const scrollY = Number(
      this.document.body.dataset['dialogScrollY'] ?? 0,
    );

    delete this.document.body.dataset['dialogScrollY'];
    this.document.body.style.position = '';
    this.document.body.style.top = '';
    this.document.body.style.width = '';
    this.document.body.style.overflowY = '';

    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(
  container: HTMLElement,
): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE),
  );
}

function getFirstFocusable(
  container: HTMLElement,
): HTMLElement | null {
  return getFocusableElements(container)[0] ?? null;
}

function trapFocus(
  event: KeyboardEvent,
  container: HTMLElement,
): void {
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
