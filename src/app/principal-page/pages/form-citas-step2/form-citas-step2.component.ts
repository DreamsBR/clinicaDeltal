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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { format } from 'date-fns';
const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

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
    MatDatepickerModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter , deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  templateUrl: './form-citas-step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})




export class FormCitasStep2Component {
  @Output() citasListChange = new EventEmitter<CitasInterface[]>();
  form!: FormGroup;
  citasList: CitasInterface[] = [];

  isLinear = true;
  medicosList: MedicoInterface[] = [];
  horariosList: HorariosInterface[] = [];
  pacianteLinks: string | undefined;
  doctorsLinks: string | undefined;
  hoursLinks: string | undefined;

  minDate = new Date();

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
    dates: ['', Validators.required],
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
  pacienteProfileId: string = '';

  citaCode: string = '';
  GuardarCita() {
    this.listDoctors();
    this.createNewCita();
    const fechaRaw = this.fourFormGroup.value.dates ?? "";
    const fechaFormateada = format(new Date(fechaRaw), 'dd/MM/yyyy');

    const citas: CitasInterface = {
      fecha: fechaFormateada +' - '+ this.fourFormGroup.value.times,
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
      this.citasService.sendEmailCitas(this.pacienteProfileId);
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
