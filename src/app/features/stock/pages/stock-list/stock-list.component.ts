import {Component, effect, inject, signal} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Button} from 'primeng/button';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stock-list',
  imports: [
    Button,
    NgForOf
  ],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {
  private stockService = inject(StockService);

  stocks = signal<any[]>([]);

  constructor(
    private router: Router
  ) {
    effect(() => {
      this.stockService.getStocksWithDetails().subscribe(data => {
        this.stocks.set(data);
      });
    });
  }

  linkToStocksByUser(): void {
    this.router.navigate(['/stock/stock/user']);
  }

}
