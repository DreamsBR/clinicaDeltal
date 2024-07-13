import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLandingComponent } from './principal-page/pages/menu-landing/menu-landing.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuLandingComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clinicaDeltal';
}
