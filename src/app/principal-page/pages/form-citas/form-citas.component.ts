import { Component, Input, OnInit, Output } from '@angular/core';
import { SideMenuCitaComponent } from '../../../shared/side-menu-cita/side-menu-cita.component';
import { FooterPagesComponent } from '../../../shared/footer-pages/footer-pages.component';
import { FormCitasStep2Component } from '../form-citas-step2/form-citas-step2.component';
import { EventEmitter } from 'stream';
import { CitasInterface } from '../../../interfaces/CitasInterface';

@Component({
  selector: 'app-form-citas',
  standalone: true,
  imports: [
    SideMenuCitaComponent,
    FooterPagesComponent,
    FormCitasStep2Component,
  ],
  templateUrl: './form-citas.component.html',
  styleUrl: './form-citas.component.scss',
})
export class FormCitasComponent{

}
