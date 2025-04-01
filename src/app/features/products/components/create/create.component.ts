
import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {


  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _productService: ProductService = inject(ProductService);

  productForm: FormGroup;

  constructor() {
    this.productForm = this._fb.group({
      nom: [null, [Validators.required,Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(255)]],
      imageUrl: [null,[]],
      prix: [null, [Validators.required,Validators.min(0)]]
    });
  }

  submit() {

    this.productForm.markAllAsTouched();

    if(this.productForm.invalid) {
      return;
    }

    console.log(this.productForm.value);
    this._productService.create(this.productForm.value).subscribe({
      next: () => {
        this._router.navigate(['/products']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
