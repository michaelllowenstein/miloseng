import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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

  readonly slug = this.route.snapshot.paramMap.get('slug');
  readonly project = getProjectPreview(this.slug);

  readonly relatedProjects = computed(() =>
    PROJECT_PREVIEWS
      .filter(project => project.id !== this.project?.id)
      .slice(0, 3),
  );
}
