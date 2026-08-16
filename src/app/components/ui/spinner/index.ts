import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './index.html',
})
export class Spinner {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}