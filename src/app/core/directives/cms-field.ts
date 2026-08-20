import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  EffectRef,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  Signal,
  effect,
  inject,
  input,
} from '@angular/core';

import { DialogService } from '@factory/dialog/service';
import { AuthService } from '@services/auth';
import { CmsService } from '@services/cms';
import { AuthDialog } from '@ui/dialog/auth';
import {
  ContextMenu,
  ContextMenuData,
  ContextMenuItem,
} from '@ui/dialog/context-menu';
import {
  EditDialog,
  EditDialogData,
} from '@ui/dialog/edit';

/**
 * Realtime scalar CMS field.
 *
 * Responsibilities:
 *  - subscribe to the RTDB scalar field through CmsService.fieldSignal()
 *  - render live value changes into the host element
 *  - preserve checked-in text as the fallback value
 *  - expose the CMS editing flow through right-click:
 *      ContextMenu -> AuthDialog -> EditDialog
 *
 * Usage:
 *
 * <h1
 *   cmsPath="contact/header"
 *   cmsField="headline">
 *   Let's connect
 * </h1>
 *
 * No separate appEditable directive is required for scalar cmsField nodes.
 */
@Directive({
  selector: '[cmsField]',
  standalone: true,
})
export class CmsFieldDirective
  implements OnInit, OnDestroy {

  private readonly cms =
    inject(CmsService);

  private readonly dialog =
    inject(DialogService);

  private readonly auth =
    inject(AuthService);

  private readonly element =
    inject(ElementRef<HTMLElement>);

  private readonly renderer =
    inject(Renderer2);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly injector =
    inject(Injector);

  private readonly platformId =
    inject(PLATFORM_ID);

  readonly cmsPath =
    input.required<string>();

  readonly cmsField =
    input.required<string>();

  /**
   * Explicit fallback. When omitted, the directive captures the checked-in
   * textContent before the realtime listener is attached.
   */
  readonly cmsFallback =
    input<string | null>(null);

  /**
   * Disable the right-click editor for a public CMS field while retaining the
   * realtime read behavior.
   */
  readonly cmsEditable =
    input<boolean>(true);

  readonly cmsEditLabel =
    input<string | null>(null);

  readonly cmsEditType =
    input<'text' | 'textarea'>('text');

  private value?: Signal<string>;
  private renderEffect?: EffectRef;
  private contextHandler?: (event: MouseEvent) => void;

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

    if (
      !isPlatformBrowser(this.platformId) ||
      !this.cmsEditable()
    ) {
      return;
    }

    this.installEditorTrigger();
  }

  ngOnDestroy(): void {
    this.renderEffect?.destroy();

    if (this.contextHandler) {
      this.element.nativeElement.removeEventListener(
        'contextmenu',
        this.contextHandler,
      );
    }
  }

  private installEditorTrigger(): void {
    const element = this.element.nativeElement;

    element.classList.add('editable-region');
    element.style.cursor = 'context-menu';

    this.contextHandler =
      (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        void this.openEditorFlow(
          event.clientX,
          event.clientY,
        ).catch(error => {
          console.error(
            '[CmsFieldDirective] Failed to open CMS editor',
            error,
          );
        });
      };

    element.addEventListener(
      'contextmenu',
      this.contextHandler,
    );
  }

  private async openEditorFlow(
    x: number,
    y: number,
  ): Promise<void> {
    const menuWidth = 190;
    const menuHeight = 48;
    const margin = 8;

    const clampedX = Math.max(
      margin,
      Math.min(
        x,
        window.innerWidth - menuWidth - margin,
      ),
    );

    const clampedY = Math.max(
      margin,
      Math.min(
        y,
        window.innerHeight - menuHeight - margin,
      ),
    );

    const label =
      this.cmsEditLabel() ??
      humanizeFieldName(this.cmsField());

    const menuRef = this.dialog.open<
      ContextMenu,
      ContextMenuData,
      string
    >(
      ContextMenu,
      {
        bare: true,
        data: {
          x: clampedX,
          y: clampedY,
          items: [{
            label,
          }]},
      },
    );

    const action = await menuRef.closed;

    if (action !== 'edit') {
      return;
    }

    if (!this.auth.isAuthenticated()) {
      const authRef = this.dialog.open<
        AuthDialog,
        undefined,
        boolean
      >(
        AuthDialog,
        {},
      );

      const authenticated =
        await authRef.closed;

      if (authenticated !== true) {
        return;
      }
    }

    const editRef = this.dialog.open<
      EditDialog,
      EditDialogData,
      boolean
    >(
      EditDialog,
      {
        data: {
          path: this.cmsPath(),
          field: this.cmsField(),
          label,
          fieldType: this.cmsEditType(),
        },
        disableClose: true,
      },
    );

    await editRef.closed;

    // No reload: the active RTDB listener updates this.value immediately.
  }
}

function humanizeFieldName(
  field: string,
): string {
  return field
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/^./, char => char.toUpperCase());
}
