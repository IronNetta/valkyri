import {Component, inject} from '@angular/core';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  imports: [],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {

  private readonly _service: StockService = inject(StockService);

}
