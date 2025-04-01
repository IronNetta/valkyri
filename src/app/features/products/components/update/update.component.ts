import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailsDtoModel } from '../../models/product-details-dto.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _productService: ProductService = inject(ProductService);

  productForm: FormGroup;
  productId!: number;

  constructor() {
    this.productForm = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.maxLength(255)]],
      picture: [null, []],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this._productService.findByID(this.productId).subscribe({
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
  }

  submit(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;

    this._productService.update(this.productId, this.productForm.value).subscribe({
      next: () => {
        this._router.navigate(['/products']);
      },
      error: (error)=> {
        console.error(error);
      }
    })

  }

}
