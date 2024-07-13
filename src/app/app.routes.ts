import { Routes } from '@angular/router';
import { PricipalPageComponent } from './principal-page/pages/pricipal-page/pricipal-page.component';
import { FormCitasComponent } from './principal-page/pages/form-citas/form-citas.component';
import { FormCitasStep2Component } from './principal-page/pages/form-citas-step2/form-citas-step2.component';
import { FormCitasStep3Component } from './principal-page/pages/form-citas-step3/form-citas-step3.component';
import { ResumenCitaComponent } from './principal-page/pages/resumen-cita/resumen-cita.component';

export const routes: Routes = [

    {path: '', component: PricipalPageComponent, pathMatch: 'full'},
    {path: 'form-citas', component: FormCitasComponent},
    {path: 'step2', component: FormCitasStep2Component},
    {path: 'step3', component: FormCitasStep3Component},
    {path: 'resumen', component: ResumenCitaComponent},
];
