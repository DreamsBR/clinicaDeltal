import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteInterface } from '../interfaces/PacienteInterface';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PacienteServicesService {
  constructor(public _http: HttpClient) {}

  guardarPaciente(paciente: PacienteInterface) {
    return this._http.post('http://localhost:8080/api/v1/pacientes', paciente);
  }

  getPacientesById(pacienteId: any): Observable<any> {
    return this._http
      .get(`http://localhost:8080/api/v1/citas/${pacienteId}/paciente`)
      .pipe(map((result: any) => result));
  }
  getPacientesByIdPlux(pacienteId: any) {
    return this._http.get(
      `http://localhost:8080/api/v1/citas/${pacienteId}/paciente`
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
