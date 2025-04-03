import {Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {BadgeModule} from 'primeng/badge';
import {NgStyle} from '@angular/common';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {StockService} from '../../services/stock.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stock-list-user',
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    BadgeModule,
    NgStyle
  ],
  templateUrl: './stock-list-user.component.html',
  styleUrl: './stock-list-user.component.scss'
})
export class StockListUserComponent {
  stocks = signal<StockDetailsDto[]>([]);
  private readonly _service: StockService = inject(StockService);

  constructor(
    private router: Router,
  ) {
    this.fetchStocks();

  }

  fetchStocks(): void {
    this._service.getStockFromUser().subscribe((data) => {
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

  goToLowStocks(): void {
    this.router.navigate(['/stock/low']);
  }

}
