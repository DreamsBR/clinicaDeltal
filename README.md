Mis disculpas por la confusión anterior. Aquí tienes todo el contenido con el formato adecuado para un archivo de GitHub:

```markdown
# `FormCitasStep2Component` Explicación de Métodos

### Constructor
```typescript
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

  this.listDoctors();
}
```
El constructor inicializa los servicios necesarios y configura los observadores para los cambios en los formularios (`firstFormGroup`, `secondFormGroup`, y `threeFormGroup`). También llama al método `listDoctors` para obtener la lista de médicos disponibles.

### goForward
```typescript
goForward(stepper: MatStepper): void {
  stepper.next();
}
```
Este método avanza al siguiente paso en el componente `MatStepper`.

### jumpData
```typescript
jumpData() {
  this.router.navigate(['/resumen']);
}
```
Este método navega a la ruta `/resumen`, probablemente para mostrar un resumen de la cita.

### listDoctors
```typescript
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
```
Este método obtiene la lista de médicos disponibles desde el servicio `DoctorsServicesService` y la almacena en `medicosList`.

### createNewCita
```typescript
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
  });
}
```
Este método crea un nuevo paciente utilizando los datos de los formularios `firstFormGroup` y `secondFormGroup`, y lo guarda utilizando el servicio `PacienteServicesService`. La URL del paciente guardado se almacena en `pacianteLinks`.

### GuardarCita
```typescript
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
    this.citasService.sendEmailCitas(this.pacienteProfileId);
  });

  console.log('Data');
  this.enviarCitas();
}
```
Este método guarda una nueva cita utilizando los datos de los formularios y el servicio `CitasServicesService`. Luego envía un correo electrónico con los detalles de la cita.

### enviarCitas
```typescript
enviarCitas() {
  this.citasService.changeCitas(this.citasList);
}
```
Este método emite un evento con la lista de citas (`citasList`) a través del servicio `CitasServicesService`.

### listarHorarios
```typescript
listarHorarios() {
  const urlCod = this.threeFormGroup.value.doctor;
  const profileId = urlCod?.split('/api/v1/doctors/')[1];

  this.doctosService.getHoursDoctor(profileId).subscribe((result) => {
    this.horariosList = result._embedded.horarios;
  });
}
```
Este método obtiene los horarios disponibles para un médico seleccionado utilizando el servicio `DoctorsServicesService` y los almacena en `horariosList`.
```


### ResumenCitaComponent

Claro, aquí tienes el código del componente `ResumenCitaComponent` con la explicación de cada método en formato Markdown para una hoja de GitHub:

```markdown
# `ResumenCitaComponent` Explicación de Métodos

### Constructor
```typescript
constructor(
  private cdr: ChangeDetectorRef,
  private citasService: CitasServicesService,
  private pacienteServices: PacienteServicesService,
  private medicoServices: DoctorsServicesService
) {}
```
El constructor inicializa los servicios necesarios para el componente (`ChangeDetectorRef`, `CitasServicesService`, `PacienteServicesService`, y `DoctorsServicesService`).

### ngOnInit
```typescript
ngOnInit() {
  this.citasService.currentCitas.subscribe(
    (citas) => (this.citasList = citas)
  );

  this.obtenerDatos();
}
```
Este método se llama una vez que el componente ha sido inicializado. Suscribe a `currentCitas` del `CitasServicesService` para obtener la lista de citas y llama al método `obtenerDatos` para obtener detalles adicionales sobre el doctor y el paciente.

### obtenerDatos
```typescript
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
```
Este método obtiene los detalles del doctor y del paciente asociados a cada cita en `citasList`. 

1. **Extracción de IDs**: Para cada cita, extrae el ID del doctor y el paciente desde las URLs en `_links`.
2. **Obtención de detalles**: Si existen los IDs, llama a los servicios `getDoctorByIdPlux` y `getPacientesByIdPlux` para obtener los detalles del doctor y del paciente, respectivamente. Los resultados se almacenan en `doctorLink` y `pacienteLink`.
3. **Cambio de detección**: Llama a `detectChanges` del `ChangeDetectorRef` para actualizar la vista.

```
