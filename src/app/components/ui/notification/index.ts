import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './index.html',
})
export class Notification {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
}