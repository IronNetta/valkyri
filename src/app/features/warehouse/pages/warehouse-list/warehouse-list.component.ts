import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { WarehouseDtoModel } from '../../models/warehouse-dto.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
  imports: [
    TableModule,
    FormsModule,
    InputText,
    ButtonDirective,
    ConfirmDialog
  ],
  providers: [ConfirmationService]
})
export class WarehouseListComponent implements OnInit {
  warehouses: WarehouseDtoModel[] = [];
  filteredWarehouses: WarehouseDtoModel[] = [];
  searchQuery: string = '';

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe((data) => {
      this.warehouses = data;
      this.filteredWarehouses = data;
    });
  }

  filterWarehouses(): void {
    this.filteredWarehouses = this.warehouses.filter(warehouse =>
      warehouse.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

  }

  addWarehouse(): void {
    this.router.navigate(['/warehouse/create']);
  }

  confirmDeleteWarehouse(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet entrepôt ?',
      accept: () => {
        this.warehouseService.delete(id).subscribe(() => {
          this.fetchWarehouses();
        });
      }
    });
  }
}
