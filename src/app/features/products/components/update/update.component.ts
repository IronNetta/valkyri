import {Component, effect, inject, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailsDtoModel } from '../../models/product-details-dto.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
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
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(255)]],
      picture: [null, []],
      price: [null, [Validators.required, Validators.min(0)]]
    });

    // Récupérer l'ID du produit dès l'initialisation
    this.productId.set(Number(this._route.snapshot.paramMap.get('id')) || null);

    // Charger le produit si un ID est présent
    effect(() => {
      const id = this.productId();
      if (id) {
        this._productService.findByID(id).subscribe({
          next: (product: ProductDetailsDtoModel) => {
            this.productForm.patchValue({
              name: product.nom,
              description: product.description,
              picture: product.imageUrl,
              price: product.prix
            });
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
