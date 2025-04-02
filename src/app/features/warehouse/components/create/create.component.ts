import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
@Component({
  selector: 'app-create',
    imports: [
        Button,
        FloatLabel,
        InputText,
        ReactiveFormsModule
    ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateWarehouseComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _warehouseService: WarehouseService = inject(WarehouseService);

  warehouseForm: FormGroup;

  constructor() {
    this.warehouseForm = this._fb.group({
      nom: [null, [Validators.required, Validators.maxLength(50)]],
      stockid: [null, [Validators.required, Validators.min(1)]]
    });
  }

  submit() {
    this.warehouseForm.markAllAsTouched();

    if (this.warehouseForm.invalid) {
      return;
    }

    console.log(this.warehouseForm.value);
    this._warehouseService.create(this.warehouseForm.value).subscribe({
      next: () => {
        this._router.navigate(['/warehouses']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
