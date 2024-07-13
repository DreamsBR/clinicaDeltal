import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-citas-step3',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './form-citas-step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCitasStep3Component { }
