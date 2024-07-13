import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-landing',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-landing.component.html',
  styleUrl: './menu-landing.component.scss'
})
export class MenuLandingComponent {

  route:string = 'form-citas'; 

  constructor(private router:Router){
  }
  goToFormCitas(){
    this.router.navigate(['form-citas']);
  }
}
