import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { DialogService } from '@factory/dialog/service';
import { AuthService } from '@services/auth';
import { AuthDialog } from '@ui/dialog/auth';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuData,
} from '@ui/dialog/context-menu';
import {
  EditDialog,
  EditDialogData,
} from '@ui/dialog/edit';

@Directive({
  selector: '[appEditable]',
  standalone: true,
})
export class EditableDirective implements OnInit, OnDestroy {
  @Input({ alias: 'appEditable', required: true })
  path = '';

  @Input()
  editField: string | null = null;

  @Input()
  editLabel = 'Content';

  @Input()
  editType: 'text' | 'textarea' = 'text';

  private readonly element =
    inject(ElementRef<HTMLElement>);

  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly dialog: DialogService =
    inject(DialogService);

  private readonly auth: AuthService =
    inject(AuthService);

  private contextHandler?: (event: MouseEvent) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.element.nativeElement;
    element.style.cursor = 'context-menu';
    element.classList.add('editable-region');

    this.contextHandler = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      void this.openContextMenu(
        event.clientX,
        event.clientY,
      ).catch(error => {
        console.error(
          '[EditableDirective] Failed to open CMS editor',
          error,
        );
      });
    };

    element.addEventListener(
      'contextmenu',
      this.contextHandler,
    );
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.contextHandler) {
      this.element.nativeElement.removeEventListener(
        'contextmenu',
        this.contextHandler,
      );
    }
  }

  private async openContextMenu(
    x: number,
    y: number,
  ): Promise<void> {
    const margin = 8;
    const menuWidth = 190;
    const menuHeight = 48;

    const clampedX = Math.max(
      margin,
      Math.min(x, window.innerWidth - menuWidth - margin),
    );

    const clampedY = Math.max(
      margin,
      Math.min(y, window.innerHeight - menuHeight - margin),
    );

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
          items: [
            {label: this.editLabel,}
          ]
        },
      },
    );

    const action = await menuRef.closed;
    if (action !== 'edit') return;

    if (!this.auth.isAuthenticated()) {
      const authenticated = await this.promptAuth();
      if (!authenticated) return;
    }

    await this.openEditor();
  }

  private async promptAuth(): Promise<boolean> {
    const authRef = this.dialog.open<
      AuthDialog,
      undefined,
      boolean
    >(
      AuthDialog,
      {},
    );

    return (await authRef.closed) === true;
  }

  private async openEditor(): Promise<void> {
    const editRef = this.dialog.open<
      EditDialog,
      EditDialogData,
      boolean
    >(
      EditDialog,
      {
        data: {
          path: this.path,
          field: this.editField,
          label: this.editLabel,
          fieldType: this.editType,
        },
        disableClose: true,
      },
    );

    await editRef.closed;

    // Realtime Database listeners update cmsField / fieldSignal consumers.
    // Do not reload the page after save.
  }
}
