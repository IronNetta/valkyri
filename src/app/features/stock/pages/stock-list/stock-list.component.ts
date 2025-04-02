import {Component, effect, inject, signal} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Button} from 'primeng/button';
import {NgForOf} from '@angular/common';

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

  private readonly _stockService: StockService = inject(StockService);

  stocks!:StockDetailsDto[];

  constructor(
  ) {
    this._stockService.getAllStocks().subscribe({
      next: datas => this.stocks = datas,
      error: err => console.log(err),
    });
  }


}
