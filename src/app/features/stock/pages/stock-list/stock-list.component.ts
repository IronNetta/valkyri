import {Component, inject} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-stock-list',
  imports: [
    Button
  ],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {

  private readonly _service: StockService = inject(StockService);

  stock!: StockDetailsDto[];

  constructor() {
    this._service.getAllStocks().subscribe({
      next: datas => this.stock = datas,
      error: err => console.error(err)
    })
  }

}
