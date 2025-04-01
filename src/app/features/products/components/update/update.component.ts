import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailsDtoModel } from '../../models/product-details-dto.model';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Button
  ],
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);

  productForm: FormGroup;
  productId = signal<number | null>(null);

  constructor() {
    this.productForm = this._fb.group({
      nom: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(255)]],
      imageUrl: [null, []],
      prix: [null, [Validators.required, Validators.min(0)]]
    });

    // Récupérer l'ID du produit dès l'initialisation
    const idParam = this._route.snapshot.paramMap.get('id');
    this.productId.set(idParam ? Number(idParam) : null);


    // Charger le produit si un ID est présent
    effect(() => {
      const id = this.productId();
      if (id) {
        this._productService.findByID(id).subscribe({
          next: (product: ProductDetailsDtoModel) => {
            console.log('Prix avant patchValue:', product.prix, 'Type:', typeof product.prix);

            console.log('Produit récupéré :', product);
            console.log('FUUCKkkkkkkkkkkkk you BRUDAH');
            console.log('ID récupéré:', idParam);


            this.productForm.patchValue({
              nom: product.nom,
              description: product.description,
              imageUrl: product.imageUrl,
              prix: product.prix
            });
            console.log('FUUCKkkkkkkkkkkkk you');
            console.log('ID récupéré:', idParam);

          },
          error: (err) => console.error('Erreur lors de la récupération du produit', err)
        });
      }
    });
  }

  submit(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;

    const id = this.productId();
    if (!id) return;

    this._productService.update(id, this.productForm.value).subscribe({
      next: () => {
        this._router.navigate(['/products']);
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }
}
