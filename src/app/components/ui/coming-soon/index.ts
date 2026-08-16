import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  templateUrl: './index.html',
})
export class ComingSoon {
  @Input() label = 'Coming soon';
}