import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu-cita',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu-cita.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuCitaComponent {
  homepage : string = "";
}
