import { Component } from '@angular/core';
import { LandingComponent } from '@feature/landing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent],
  templateUrl: './index.html',
})
export class HomePage {}