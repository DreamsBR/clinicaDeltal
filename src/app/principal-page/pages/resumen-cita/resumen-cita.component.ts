import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SideMenuCitaComponent } from '../../../shared/side-menu-cita/side-menu-cita.component';
import { FooterPagesComponent } from '../../../shared/footer-pages/footer-pages.component';
import { CitasInterface } from '../../../interfaces/CitasInterface';
import { SharedDataService } from '../../../services/SharedData.service';
import { CitasServicesService } from '../../../services/CitasServices.service';
import { PacienteInterface } from '../../../interfaces/PacienteInterface';
import { MedicoInterface } from '../../../interfaces/MedicoInterface';
import { PacienteServicesService } from '../../../services/PacienteServices.service';
import { DoctorsServicesService } from '../../../services/DoctorsServices.service';

@Component({
  selector: 'app-resumen-cita',
  standalone: true,
  imports: [CommonModule, SideMenuCitaComponent, FooterPagesComponent],
  templateUrl: './resumen-cita.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumenCitaComponent implements OnInit {
  citasList: any[] = [];
  pacienteLink: PacienteInterface[] = [];
  doctorLink: MedicoInterface[] = [];

  pacienteId: string = '';
  doctorId: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private citasService: CitasServicesService,
    private pacienteServices: PacienteServicesService,
    private medicoServices: DoctorsServicesService
  ) {}

  ngOnInit() {
    this.citasService.currentCitas.subscribe(
      (citas) => (this.citasList = citas)
    );

    //console.log('Resumen :', this.citasList);
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.citasList.forEach((cita) => {
      if (typeof cita._links.doctor.href === 'string') {
        this.doctorId = cita._links.doctor.href;
      }
      if (typeof cita._links.paciente.href === 'string') {
        this.pacienteId = cita._links.paciente.href;
      }
    });

    let doctorProfileId = '';
    let pacienteProfileId = '';

    if (typeof this.doctorId === 'string') {
      const doctorIdParts = this.doctorId.split('/api/v1/citas/');
      if (doctorIdParts.length > 1) {
        doctorProfileId = doctorIdParts[1].split('/doctor')[0];
      }
    }

    if (typeof this.pacienteId === 'string') {
      const pacienteIdParts = this.pacienteId.split('/api/v1/citas/');
      if (pacienteIdParts.length > 1) {
        pacienteProfileId = pacienteIdParts[1].split('/paciente')[0];
      }
    }

    if (doctorProfileId) {
      this.medicoServices
        .getDoctorByIdPlux(doctorProfileId)
        .subscribe((result: any) => {
          this.doctorLink.push(result);
          this.cdr.detectChanges();
        });
      console.log('Doctor CITA : ', this.doctorLink);
    }

    if (pacienteProfileId) {
      this.pacienteServices
        .getPacientesByIdPlux(pacienteProfileId)
        .subscribe((result: any) => {
          this.pacienteLink.push(result);
          this.cdr.detectChanges();
        });
      console.log('Paciente CITA : ', this.pacienteLink);
    }
  }
}
