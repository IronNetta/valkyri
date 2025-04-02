import {Component, effect, inject, signal} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {NgClass} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Paginator} from 'primeng/paginator';
import {ProductDtoModel} from '../../../products/models/product-dto.model';
import {ProductService} from '../../../products/services/product.service';

@Component({
  selector: 'app-low-stock',
  imports: [
    Button,
    NgClass,
    PrimeTemplate,
    TableModule,
    Paginator
  ],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss'
})
export class LowStockComponent {
  nomProduit: string = '';
  products = signal<ProductDtoModel[]>([]);
  stocks = signal<StockDetailsDto[]>([]);
  paginatedStocks = signal<StockDetailsDto[]>([]);
  itemsPerPage = signal<number>(5);
  currentPage = signal<number>(0);
  private readonly _service: StockService = inject(StockService);

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
    effect(() => {
      this.paginate({ first: 0, rows: this.itemsPerPage() });
    });
    this.fetchStocks();

  }

  fetchStocks(): void {
    this._service.getLowStock().subscribe((data) => {
      this.stocks.set(data);
    });
    this.paginate({ first: 0, rows: this.itemsPerPage() });
  }

  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedStocks.set(this.stocks().slice(start, end));
  }

  returnToStocks(): void {
    this.router.navigate(['/stock']);
  }

}
