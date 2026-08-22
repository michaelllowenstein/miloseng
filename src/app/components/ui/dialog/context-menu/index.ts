import { Component } from '@angular/core';
import { injectDialogData, injectDialogClose } from '@factory/dialog/tokens';

export interface ContextMenuItem {
  label: string;
  icon?: string;
}

export interface ContextMenuData {
  x: number;
  y: number;
  items: ContextMenuItem[];
}

@Component({
  selector: 'app-context-menu',
  standalone: true,
  templateUrl: './index.html',
  styles: [],
})
export class ContextMenu {
  readonly data  = injectDialogData<ContextMenuData>();
  readonly close = injectDialogClose<string>();
}
