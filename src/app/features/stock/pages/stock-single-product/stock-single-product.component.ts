import {Component, inject, signal} from '@angular/core';
import { CardModule } from 'primeng/card';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {StockService} from '../../services/stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../products/services/product.service';
import {ProductDetailsDtoModel} from '../../../products/models/product-details-dto.model';

@Component({
  selector: 'app-stock-single-product',
  imports: [
    CardModule
  ],
  templateUrl: './stock-single-product.component.html',
  styleUrl: './stock-single-product.component.scss'
})
export class StockSingleProductComponent {
  stockQuantityOfProduct!: number;
  private readonly _service: StockService = inject(StockService);
  private readonly _productService: ProductService = inject(ProductService);
  private readonly _ar: ActivatedRoute = inject(ActivatedRoute);
  product!: ProductDetailsDtoModel;
  private productId!: number;
  private id!: number;

  constructor(
    private router: Router,
  ) {
    this.id = + this._ar.snapshot.params['id'];
    this._productService.findByID(this.id).subscribe({
      next: productData => {
        this.product = productData;
        this.productId = productData.id;
        console.log(this.productId);
      },
      error: error => {
        console.log(error);}
    });
    this._service.getStockByProduct(this.id).subscribe((stockData) => {
      this.stockQuantityOfProduct = (stockData);
    });

  }

  goToLowStocks(): void {
    this.router.navigate(['/stock/low']);
  }
}
