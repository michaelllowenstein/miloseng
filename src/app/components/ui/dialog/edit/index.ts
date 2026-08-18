
import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectDialogData, injectDialogClose } from '@factory/dialog/tokens';
import { CmsService } from '@services/cms';

export interface EditDialogData {
  /** Firestore document path under siteContent/, e.g. "home/hero" */
  path: string;
  /** If set, edit only this field. If null, edit all fields in the doc. */
  field: string | null;
  /** Human-readable label for the content region. */
  label: string;
  /** Field display type hint: 'text' | 'textarea' | 'rich' */
  fieldType: 'text' | 'textarea';
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
  private cms = inject(CmsService);

  data    = injectDialogData<EditDialogData>();
  close   = injectDialogClose<boolean>();
  fields  = signal<FieldEntry[]>([]);
  loading = signal(true);
  saving  = signal(false);
  error   = signal('');
  saved   = signal(false);

  async ngOnInit(): Promise<void> {
    try {
      if (this.data.field) {
        // Single field edit
        const value = await this.cms.getField(this.data.path, this.data.field);
        this.fields.set([{
          key:   this.data.field,
          value,
          type:  this.data.fieldType,
        }]);
      } else {
        // Whole document edit
        const doc = await this.cms.getDocument(this.data.path);
        this.fields.set(
          Object.entries(doc).map(([key, value]) => ({
            key,
            value,
            type: value.length > 80 ? 'textarea' as const : 'text' as const,
          }))
        );
      }
    } catch (err) {
      this.error.set('Failed to load content');
    } finally {
      this.loading.set(false);
    }
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.error.set('');
    this.saved.set(false);

    try {
      if (this.data.field && this.fields().length === 1) {
        await this.cms.saveField(this.data.path, this.data.field, this.fields()[0].value);
      } else {
        const doc: Record<string, string> = {};
        for (const f of this.fields()) {
          doc[f.key] = f.value;
        }
        await this.cms.saveDocument(this.data.path, doc);
      }
      this.saved.set(true);
      // Auto-close after brief success flash
      setTimeout(() => this.close(true), 800);
    } catch (err) {
      this.error.set('Failed to save — check console for details');
      console.error('[cms] Save failed:', err);
    } finally {
      this.saving.set(false);
    }
  }
}