import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicoInterface } from '../interfaces/MedicoInterface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorsServicesService {
  medico = [];
  constructor(public _http: HttpClient) {}

  postDoctors(doctors: MedicoInterface) {
    this._http
      .post('http://localhost:8080/api/v1/doctores', doctors)
      .subscribe((result) => {
        console.log('Doctor creado:', result);
      });
  }

  getDoctors(): Observable<any> {
    return this._http
      .get<[]>('http://localhost:8080/api/v1/doctors')
      .pipe(map((result: any) => result._embedded.doctors));
  }

  getHoursDoctor(doctorCode: any): Observable<any> {
    return this._http
      .get<[]>(`http://localhost:8080/api/v1/doctors/${doctorCode}/horarios`)
      .pipe(map((result: any) => result));
  }

  getDoctorById(doctorCode: any): Observable<any> {
    return this._http
      .get<[]>(`http://localhost:8080/api/v1/citas/${doctorCode}/doctor`)
      .pipe(map((result: any) => result));
  }

  getDoctorByIdPlux(doctorCode: any) {
    return this._http.get(
      `http://localhost:8080/api/v1/citas/${doctorCode}/doctor`
    );
  }
}
