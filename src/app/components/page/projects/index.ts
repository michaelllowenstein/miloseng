import { Component, OnInit, signal } from '@angular/core';

import { CmsFieldDirective } from '@directives/cms-field';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { PROJECTS_DEFAULTS } from '@schema/constants/site-defaults';
import { BridgeComponent } from '../../bridge';
import {
  ProjectComponent,
  ProjectPreview,
} from '@feature/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ScrollAnimateDirective,
    CmsFieldDirective,
    BridgeComponent,
    ProjectComponent,
  ],
  templateUrl: './index.html',
})
export class ProjectsPage implements OnInit {
  readonly roiDashboardComponent = signal<unknown>(null);
  readonly projects: ProjectPreview[] = PROJECTS_DEFAULTS.previews;

  async ngOnInit(): Promise<void> {
    const mod = await import('../../islands/RoiDashboard');
    this.roiDashboardComponent.set(mod.RoiDashboard);
  }
}
