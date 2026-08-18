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
import { DialogService } from '@factory/dialog/service';
import { AuthService }   from '@services/auth';
import { ContextMenuDialog, ContextMenuData } from '@ui/dialog/context-menu';
import { AuthDialog }    from '@ui/dialog/auth';
import { PasswordDialog }    from '@ui/dialog/password';
import { InlineEditDialog, InlineEditData } from '@ui/dialog/inline-edit';
import { EditDialog, EditDialogData } from '@ui/dialog/edit';

/**
 * appEditable — inline CMS directive.
 *
 * Attach to any content element to enable right-click → Edit → password gate → Firestore save.
 *
 * Usage:
 *   <h1 appEditable="home/hero" editField="tagline" editLabel="Hero Tagline">
 *     Building things that matter.
 *   </h1>
 *
 *   <div appEditable="about/bio" editLabel="About Bio">
 *     <!-- edits all fields in the document -->
 *   </div>
 *
 * Flow:
 *   1. Right-click on the element → custom context menu appears (replaces browser default)
 *   2. Click "Edit" → check if already authenticated via AuthService
 *   3. If not authenticated → password dialog → Firebase Auth login
 *   4. On success → edit dialog loads content from Firestore, shows form
 *   5. Save → writes back to Firestore
 *
 * The directive adds a subtle dashed border on hover to signal editability
 * (only visible when the user has previously authenticated in this session).
 */
@Directive({
  selector: '[appEditable]',
  standalone: true,
})
export class EditableDirective implements OnInit, OnDestroy {
  /** Firestore path under siteContent/, e.g. "home/hero" */
  @Input({ alias: 'appEditable', required: true }) path = '';

  /** Optional: specific field in the document. If omitted, edits all fields. */
  @Input() editField: string | null = null;

  /** Human-readable label shown in the context menu and edit dialog header. */
  @Input() editLabel = 'Content';

  /** Field type hint: 'text' (single line) or 'textarea' (multiline). */
  @Input() editType: 'text' | 'textarea' = 'text';

  private el         = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private dialog: DialogService     = inject(DialogService);
  private auth: AuthService       = inject(AuthService);

  private contextHandler?: (e: MouseEvent) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement as HTMLElement;

    // Visual hint: subtle dashed outline on hover
    nativeEl.style.cursor = 'context-menu';
    nativeEl.classList.add('editable-region');

    // Right-click handler
    this.contextHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.openContextMenu(e.clientX, e.clientY);
    };
    nativeEl.addEventListener('contextmenu', this.contextHandler);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (this.contextHandler) {
      nativeEl.removeEventListener('contextmenu', this.contextHandler);
    }
  }

  private async openContextMenu(x: number, y: number): Promise<void> {
    // Clamp position so menu doesn't overflow viewport
    const menuWidth = 180;
    const menuHeight = 44;
    const clampedX = Math.min(x, window.innerWidth - menuWidth);
    const clampedY = Math.min(y, window.innerHeight - menuHeight);

    const menuRef = this.dialog.open<ContextMenuDialog, ContextMenuData, string>(
      ContextMenuDialog,
      {
        bare: true,       // no backdrop dim, just the capture layer
        data: { x: clampedX, y: clampedY, items: [] },
      },
    );

    const action = await menuRef.closed;
    if (action !== 'edit') return;

    // Check auth — if already logged in, skip the password dialog
    if (!this.auth.isAuthenticated()) {
      const authenticated = await this.promptAuth();
      if (!authenticated) return;
    }

    await this.openEditor();
  }

  private async promptAuth(): Promise<boolean> {
    const authRef = this.dialog.open<AuthDialog, void, boolean>(
      AuthDialog,
      { panelClass: 'flex items-center justify-center' },
    );
    return (await authRef.closed) === true;
  }

  private async openEditor(): Promise<void> {
    const editRef = this.dialog.open<InlineEditDialog, InlineEditData, boolean>(
      InlineEditDialog,
      {
        data: {
            path: this.path,
            field: this.editField!,
            label: this.editLabel,
            fieldType: this.editType!,
            fieldKey: '',
            currentValue: ''
        },
        panelClass: 'flex items-center justify-center',
        disableClose: true,
      },
    );

    const saved = await editRef.closed;
    if (saved) {
      // Optionally reload the page to reflect the saved content.
      // In a future iteration, this could use a signal or observable
      // to reactively update only the edited element.
      window.location.reload();
    }
  }
}