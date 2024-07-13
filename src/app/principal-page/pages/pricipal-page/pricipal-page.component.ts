import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuLandingComponent } from '../menu-landing/menu-landing.component';
import { FormCitasComponent } from '../form-citas/form-citas.component';
import { FooterPagesComponent } from '../../../shared/footer-pages/footer-pages.component';

@Component({
  selector: 'app-pricipal-page',
  standalone: true,
  imports: [MenuLandingComponent, FormCitasComponent, FooterPagesComponent],
  templateUrl: './pricipal-page.component.html',
  styleUrl: './pricipal-page.component.scss'
})
export class PricipalPageComponent {

  constructor(private router:Router){
  }

  goToFormCitas(){
    this.router.navigate(['form-citas']);
  }
}
