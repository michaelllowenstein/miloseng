import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './index.html',
})
export class Icon {
  @Input({ required: true }) name!: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}