import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPagesComponent {}
