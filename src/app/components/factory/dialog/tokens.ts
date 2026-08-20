import { InjectionToken, inject } from '@angular/core';

export type DialogCloseFn<R = unknown> =
  (result?: R) => void;

export const DIALOG_DATA =
  new InjectionToken<unknown>('DIALOG_DATA');

export const DIALOG_CLOSE_FN =
  new InjectionToken<DialogCloseFn>('DIALOG_CLOSE_FN');

export function injectDialogData<D = unknown>(): D {
  return inject(DIALOG_DATA) as D;
}

export function injectDialogClose<R = unknown>(): DialogCloseFn<R> {
  return inject(DIALOG_CLOSE_FN) as DialogCloseFn<R>;
}
