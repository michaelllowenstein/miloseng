import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectDialogData, injectDialogClose } from '@factory/dialog/tokens';
import { CmsService } from '@services/cms';

export interface EditDialogData {
  path: string;
  field: string | null;
  label: string;
  fieldType: 'text' | 'textarea';
  /**
   * Pre-populated value from the live signal or DOM textContent.
   * Avoids a separate DB read that may hit Firestore/RTDB mismatch.
   */
  currentValue?: string;
}

interface FieldEntry {
  key: string;
  value: string;
  type: 'text' | 'textarea';
}

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.html',
  styles: [],
})
export class EditDialog implements OnInit {
  private readonly cms = inject(CmsService);

  readonly data  = injectDialogData<EditDialogData>();
  readonly close = injectDialogClose<boolean>();

  readonly fields  = signal<FieldEntry[]>([]);
  readonly loading = signal(true);
  readonly saving  = signal(false);
  readonly error   = signal('');
  readonly saved   = signal(false);

  ngOnInit(): void {
    const fieldKey = this.data.field ?? this.data.label;
    const initial  = this.data.currentValue ?? '';

    this.fields.set([{
      key:   fieldKey,
      value: initial,
      type:  this.data.fieldType,
    }]);

    this.loading.set(false);
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.error.set('');
    this.saved.set(false);

    try {
      const entry = this.fields()[0];

      if (this.data.field) {
        await this.cms.saveField(
          this.data.path,
          this.data.field,
          entry.value,
        );
      } else {
        await this.cms.saveDocument(this.data.path, {
          [entry.key]: entry.value,
        });
      }

      this.saved.set(true);
      setTimeout(() => this.close(true), 800);
    } catch (err) {
      this.error.set('Failed to save — check console for details');
      console.error('[EditDialog] Save failed:', err);
    } finally {
      this.saving.set(false);
    }
  }
}
