import {
  DestroyRef,
  Injectable,
  Signal,
  inject,
  signal,
} from '@angular/core';
import {
  Database,
  DatabaseReference,
  get,
  onValue,
  ref,
  set,
  update,
} from '@angular/fire/database';

import { CONTENT_ROOT } from '@schema/constants';

export type CmsDocument = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class CmsService {
  private readonly db = inject(Database);
  private readonly root = CONTENT_ROOT;

  // ── References ──────────────────────────────────────────────────────────────

  private documentRef(path: string): DatabaseReference {
    return ref(this.db, this.joinPath(this.root, path));
  }

  private fieldRef(path: string, field: string): DatabaseReference {
    return ref(this.db, this.joinPath(this.root, path, field));
  }

  // ── One-time reads ──────────────────────────────────────────────────────────

  async getField(
    path: string,
    field: string,
    fallback = '',
  ): Promise<string> {
    const snapshot = await get(this.fieldRef(path, field));

    if (!snapshot.exists()) {
      return fallback;
    }

    const value = snapshot.val();
    return typeof value === 'string' ? value : fallback;
  }

  async getDocument(path: string): Promise<CmsDocument> {
    const snapshot = await get(this.documentRef(path));

    if (!snapshot.exists()) {
      return {};
    }

    const value = snapshot.val();
    return this.isCmsDocument(value) ? value : {};
  }

  // ── Writes ──────────────────────────────────────────────────────────────────

  async saveField(
    path: string,
    field: string,
    value: string,
  ): Promise<void> {
    await set(this.fieldRef(path, field), value);
  }

  async saveDocument(
    path: string,
    data: CmsDocument,
  ): Promise<void> {
    await update(this.documentRef(path), data);
  }

  async replaceDocument(
    path: string,
    data: CmsDocument,
  ): Promise<void> {
    await set(this.documentRef(path), data);
  }

  async saveFields(
    changes: Record<string, string>,
  ): Promise<void> {
    const updates: Record<string, string> = {};

    for (const [path, value] of Object.entries(changes)) {
      updates[this.joinPath(this.root, path)] = value;
    }

    await update(ref(this.db), updates);
  }

  // ── Realtime subscriptions ──────────────────────────────────────────────────

  watchDocument(
    path: string,
    listener: (document: CmsDocument) => void,
  ): () => void {
    return onValue(
      this.documentRef(path),
      snapshot => {
        if (!snapshot.exists()) {
          listener({});
          return;
        }

        const value = snapshot.val();
        listener(this.isCmsDocument(value) ? value : {});
      },
    );
  }

  /**
   * Subscribe to one scalar CMS field.
   *
   * `fallback` is emitted when the node does not exist or does not contain
   * a string. This lets templates keep their checked-in defaults while RTDB
   * is empty, unavailable during local initialization, or only partially seeded.
   */
  watchField(
    path: string,
    field: string,
    listener: (value: string) => void,
    fallback = '',
  ): () => void {
    return onValue(
      this.fieldRef(path, field),
      snapshot => {
        if (!snapshot.exists()) {
          listener(fallback);
          return;
        }

        const value = snapshot.val();
        listener(typeof value === 'string' ? value : fallback);
      },
    );
  }

  /**
   * Angular Signal wrapper around a realtime scalar field.
   *
   * DestroyRef is intentionally supplied by the consuming component/directive.
   * This ties the Firebase subscription to the consumer's lifecycle rather than
   * the root CmsService lifecycle.
   */
  fieldSignal(
    path: string,
    field: string,
    initialValue: string,
    destroyRef: DestroyRef,
  ): Signal<string> {
    const value = signal(initialValue);

    const unsubscribe = this.watchField(
      path,
      field,
      next => value.set(next),
      initialValue,
    );

    destroyRef.onDestroy(unsubscribe);

    return value.asReadonly();
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  private joinPath(
    ...parts: Array<string | null | undefined>
  ): string {
    return parts
      .filter(
        (part): part is string =>
          typeof part === 'string' && part.length > 0,
      )
      .map(part =>
        part
          .replace(/^\/+/, '')
          .replace(/\/+$/, ''),
      )
      .filter(Boolean)
      .join('/');
  }

  private isCmsDocument(
    value: unknown,
  ): value is CmsDocument {
    if (
      value === null ||
      typeof value !== 'object' ||
      Array.isArray(value)
    ) {
      return false;
    }

    return Object.values(value).every(
      fieldValue => typeof fieldValue === 'string',
    );
  }
}
