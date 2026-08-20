import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ProjectPreview } from '@schema/models';

export type { ProjectPreview } from '@schema/models';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.html',
})
export class ProjectComponent {
  @Input({ required: true }) project!: ProjectPreview;
}