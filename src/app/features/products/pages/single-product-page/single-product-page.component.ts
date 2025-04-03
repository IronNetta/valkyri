
import {Component, inject, Input} from '@angular/core';
import {ProductSingleDtoModel} from '../../models/product-single-dto.model';
import {Button, ButtonDirective, ButtonModule} from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Card} from 'primeng/card';
import {ProductDetailsDtoModel} from '../../models/product-details-dto.model';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-single-product-page',
  imports: [
    Button,
    FieldsetModule,
    DividerModule,
    SplitterModule,
    PanelModule,
    Card
  ],
  standalone: true,
  templateUrl: './single-product-page.component.html',
  styleUrl: './single-product-page.component.scss',
  providers: [ConfirmationService]
})
export class SingleProductPageComponent {

  private readonly _productService: ProductService = inject(ProductService);
  private readonly _ar: ActivatedRoute = inject(ActivatedRoute);
  product!: ProductDetailsDtoModel;
  private id!: number;

  constructor(
    private router: Router,
  ) {
    this.id = + this._ar.snapshot.params['id'];
    this._productService.findByID(this.id).subscribe({
      next: data => {
        this.product = data;
      },
      error: error => {
        console.log(error);}
    });
    console.log("Produit récupéré : " + this.product);
  }

  editProduct(id: number): void {
    this.router.navigate(['/product/update', id]);
  }

  viewStock(id: number): void {
    this.router.navigate(['/stock/product', id]);
  }

}
