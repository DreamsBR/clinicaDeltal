import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private citasListSource = new BehaviorSubject<any[]>([]);
  currentCitasList = this.citasListSource.asObservable();

  constructor() {}

  changeCitasList(citasList: any[]) {
    this.citasListSource.next(citasList);
  }
}
