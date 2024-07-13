import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitasInterface } from '../interfaces/CitasInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasServicesService {
  constructor(private http: HttpClient) {}
  private citasSource = new BehaviorSubject<any[]>([]);
  currentCitas = this.citasSource.asObservable();

  createCita(cita: CitasInterface) {
    return this.http.post('http://localhost:8080/api/v1/citas', cita);
  }

  changeCitas(citas: any[]) {
    this.citasSource.next(citas);
  }

  sendEmailCitas(idCita: any) {
    return this.http
      .post(
        `http://localhost:8080/api/v1/citas/notifySummary?cita=${idCita}`,
        null
      )
      .subscribe((result) => {
        console.log('Email enviado:', result);
      });
  }
}
