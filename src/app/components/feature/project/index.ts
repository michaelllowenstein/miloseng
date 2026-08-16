import { Component, Input } from '@angular/core';

export interface ProjectPreview {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  tech: string[];
  status: 'active' | 'maintained' | 'experimental';
}

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './index.html',
})
export class ProjectComponent {
  @Input({ required: true }) project!: ProjectPreview;
}