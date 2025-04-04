import {Component, effect, inject, signal} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-low-stock',
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    BadgeModule,
    NgStyle
  ],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss'
})
export class LowStockComponent {
  stocks = signal<StockDetailsDto[]>([]);
  private readonly _service: StockService = inject(StockService);

  constructor(
    private router: Router,
  ) {
    this.fetchStocks();

  }

  fetchStocks(): void {
    this._service.getLowStock().subscribe((data) => {
      this.stocks.set(data);
    });
  }


  rowStyle(stock: StockDetailsDto) {
    if (stock.quantiteDisponible === 0) {
      return { fontWeight: 'bold', fontStyle: 'italic' };
    }
    return {fontStyle: 'normal' };
  }

  stockSeverity(stock: StockDetailsDto) {
    if (stock.quantiteDisponible === 0) return 'danger';
    else if (stock.quantiteDisponible > 0 && stock.quantiteDisponible < 5) return 'warn';
    else return 'success';
  }

  returnToStocks(): void {
    this.router.navigate(['/stock/stock/user']);
  }

}
