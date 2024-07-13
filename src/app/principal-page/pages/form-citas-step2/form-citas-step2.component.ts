import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResumenCitaComponent } from '../resumen-cita/resumen-cita.component';
import { PacienteServicesService } from '../../../services/PacienteServices.service';
import { PacienteInterface } from '../../../interfaces/PacienteInterface';
import { DoctorsServicesService } from '../../../services/DoctorsServices.service';
import { MedicoInterface } from '../../../interfaces/MedicoInterface';
import { CitasServicesService } from '../../../services/CitasServices.service';
import { CitasInterface } from '../../../interfaces/CitasInterface';
import { HorariosInterface } from '../../../interfaces/HorariosInterface';
import { FormCitasComponent } from '../form-citas/form-citas.component';
import { SharedDataService } from '../../../services/SharedData.service';

@Component({
  selector: 'app-form-citas-step2',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ResumenCitaComponent,
    FormCitasComponent,
    ResumenCitaComponent,
  ],
  templateUrl: './form-citas-step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCitasStep2Component {
  @Output() citasListChange = new EventEmitter<CitasInterface[]>();

  citasList: CitasInterface[] = [];

  isLinear = false;
  medicosList: MedicoInterface[] = [];
  horariosList: HorariosInterface[] = [];
  pacianteLinks: string | undefined;
  doctorsLinks: string | undefined;
  hoursLinks: string | undefined;

  constructor(
    private sharedData: SharedDataService,
    private citasService: CitasServicesService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private pacienteService: PacienteServicesService,
    private doctosService: DoctorsServicesService
  ) {
    this.firstFormGroup.valueChanges.subscribe((value) => {
      console.log('Valor actual de firstFormGroup:', value);
    });
    this.secondFormGroup.valueChanges.subscribe((value) => {
      console.log('Valor actual de secondFormGroup:', value);
    });
    this.threeFormGroup.valueChanges.subscribe((value) => {
      console.log('Valor actual de threeFormGroup:', value);
    });

    //this.doctosService.getDoctors()
    this.listDoctors();
  }

  goForward(stepper: MatStepper): void {
    stepper.next();
  }

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    numDni: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    numCel: ['', Validators.required],
    correo: ['', Validators.required],
  });
  threeFormGroup = this._formBuilder.group({
    services: ['', Validators.required],
    doctor: ['', Validators.required],
  });
  fourFormGroup = this._formBuilder.group({
    times: ['', Validators.required],
  });

  jumpData() {
    this.router.navigate(['/resumen']);
  }

  listDoctors() {
    this.doctosService.getDoctors().subscribe((result) => {
      this.medicosList = result.map((medico: any) => ({
        _links: medico._links.self.href,
        nombre: medico.nombre,
        apellido: medico.apellido,
        conact: `${medico.nombre} ${medico.apellido}`,
      }));

      return this.medicosList;
    });
  }

  createNewCita() {
    console.log('Cita creada');
    const paciente: PacienteInterface = {
      nombre: this.firstFormGroup.value.nombre || undefined,
      apellido: this.firstFormGroup.value.apellido || undefined,
      numDni: this.firstFormGroup.value.numDni || undefined,
      numCel: this.secondFormGroup.value.numCel || undefined,
      correo: this.secondFormGroup.value.correo || undefined,
    };
    this.pacienteService.guardarPaciente(paciente).subscribe((result: any) => {
      paciente._links = result._links.self.href;
      this.pacianteLinks = paciente._links;
      //console.log('Ruta paciente', this.pacianteLinks?.toString());
    });
  }
  pacienteProfileId: string = "";

  citaCode: string = "";
  GuardarCita() {
    this.listDoctors();
    this.createNewCita();
    const citas: CitasInterface = {
      fecha: this.fourFormGroup.value.times || undefined,
      paciente: this.pacianteLinks?.toString() || undefined,
      doctor: this.threeFormGroup.value.doctor || undefined,
      estado: 'Creado',
    };
    this.citasService.createCita(citas).subscribe((result: any) => {
      this.citasList.push(result);
      this.citasList.forEach((cita: any) => {
        this.citaCode = cita._links.cita.href;
        console.log('Cita Code :', this.citaCode);
        
        if (typeof this.citaCode === 'string') {
          this.pacienteProfileId = this.citaCode.split('/api/v1/citas/')[1];
        }
      });
      console.log('pacienteCode :', this.pacienteProfileId);
      //.log('Citas', this.citasList);
      this.citasService
        .sendEmailCitas(this.pacienteProfileId);
    });

    console.log('Data');
    this.enviarCitas();
  }

  enviarCitas() {
    this.citasService.changeCitas(this.citasList);
  }

  listarHorarios() {
    //console.log('Ingreso Lista Horarios');
    const urlCod = this.threeFormGroup.value.doctor;
    const profileId = urlCod?.split('/api/v1/doctors/')[1];
    //console.log('codigo :', profileId);

    this.doctosService.getHoursDoctor(profileId).subscribe((result) => {
      //console.log(result._embedded.horarios);
      this.horariosList = result._embedded.horarios;
    });
    //console.log(,this.horariosList);
  }
}
