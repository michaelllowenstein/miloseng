import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import {
  PROJECT_PREVIEWS,
  getProjectPreview,
} from '@schema/constants';

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.html',
})
export class PreviewPage {
  private readonly route = inject(ActivatedRoute);

  /**
   * Reactive slug — subscribes to paramMap so Angular re-evaluates on
   * in-place navigation (e.g. clicking a related project card while
   * already on a preview page).
   *
   * The previous implementation used `route.snapshot.paramMap.get('slug')`
   * which only runs once. When the user clicks a related-project link
   * that resolves to the same route config (`projects/:slug`), Angular
   * reuses the component instance and never re-reads the snapshot.
   * Result: the page stalls with stale data.
   */
  private readonly slug = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug')),
    ),
  );

  readonly project = computed(() => {
    const s = this.slug();
    return s ? getProjectPreview(s) : undefined;
  });

  readonly relatedProjects = computed(() => {
    const current = this.project();
    if (!current) return [];

    return PROJECT_PREVIEWS
      .filter(p => p.id !== current.id)
      .slice(0, 3);
  });
}
