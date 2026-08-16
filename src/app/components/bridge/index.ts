import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Generic React Island wrapper for Angular.
 *
 * Usage:
 *   <app-react-island [component]="MyReactComponent" [props]="{ data: someData }" />
 *
 * Mounts a React 18 component into a container div, forwarding
 * `props` on every change and unmounting on destroy.
 */
@Component({
  selector: 'app-bridge',
  standalone: true,
  template: `<div #container class="react-bridge"></div>`,
})
export class BridgeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() component: any;
  @Input() props: Record<string, any> = {};

  private root: any = null;
  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    await this.mountReact();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.root && (changes['props'] || changes['component'])) {
      await this.renderReact();
    }
  }

  ngOnDestroy(): void {
    this.root?.unmount();
    this.root = null;
  }

  private async mountReact(): Promise<void> {
    const ReactDOM = await import('react-dom/client');
    this.root = ReactDOM.createRoot(this.containerRef.nativeElement);
    await this.renderReact();
  }

  private async renderReact(): Promise<void> {
    if (!this.root || !this.component) return;
    const React = await import('react');
    this.root.render(React.createElement(this.component, this.props));
  }
}
