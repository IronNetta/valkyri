import {Component, effect, inject, signal} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {StockDetailsDto} from '../../models/stock-details-dto.model';
import {Button, ButtonDirective} from 'primeng/button';
import {NgForOf} from '@angular/common';
import {Paginator} from "primeng/paginator";
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {ProductService} from '../../../products/services/product.service';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-stock-list',
  imports: [
    Button,
    NgForOf,
    Paginator,
    ButtonDirective,
    FormsModule,
    InputText
  ],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {



  stocks = signal<any[]>([]);
  itemsPerPage = signal<number>(4);
  filteredStocks = signal<StockDetailsDto[]>([]);
  paginatedStocks = signal<StockDetailsDto[]>([]);
  searchQuery = signal<string>('');


  //private stockService = inject(StockService);



  constructor(
    private stockService: StockService,
    private router: Router,
    //private confirmationService: ConfirmationService
  ) {
    effect(() => {
      this.paginate({first: 0, rows: this.itemsPerPage()});
      //this.stockService.getStocksWithDetails().subscribe(data => {
      //this.stocks.set(data);

    });
    this.fetchStocks();
  }



  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedStocks.set(this.filteredStocks().slice(start, end));
  }



  fetchStocks(): void {
    this.stockService.getAllStocks().subscribe((data) => {
      this.stocks.set(data);
      this.filteredStocks.set(data);
    });
  }




  filterStock(): void {
    this.filteredStocks.set(
      this.stocks().filter(product =>
        product.nom.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
    );
    this.paginate({ first: 0, rows: this.itemsPerPage() });
  }




  addStock(): void {
    this.router.navigate(['/stock/create']);
  }



  editStock(id: number): void {
    this.router.navigate(['/stock/update', id]);
  }



  // deleteProduct(id: number): void {
  //   this.confirmationService.confirm({
  //     message: 'Êtes-vous sûr de vouloir supprimer ce stock ?',
  //     accept: () => {
  //       this.stockService.deleteStock(id).subscribe(() => {
  //         this.fetchStocks();
  //       });
  //     }
  //   });
  // }


}
