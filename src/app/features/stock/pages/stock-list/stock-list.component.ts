import {Component, inject} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

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

  stocks!: StockDetailsDto[];

  constructor(
    private router: Router,
  ) {
    this._service.getAllStocks().subscribe({
      next: datas =>{
        this.stocks = datas;
        console.log(this.stocks);
      },
      error: err => console.error(err)
    })
  }

  checkLowStock(): void {
    this.router.navigate(['/stock/low']);
  }

}
