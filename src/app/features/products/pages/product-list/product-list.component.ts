import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDtoModel } from '../../models/product-dto.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    TableModule,
    FormsModule,
    ButtonDirective,
    InputText
  ],
  providers: [ConfirmationService]
})
export class ProductListComponent implements OnInit {
  products: ProductDtoModel[] = [];
  filteredProducts: ProductDtoModel[] = [];
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.nom.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  addProduct(): void {
    this.router.navigate(['/product/create']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/product/update', id]);
  }

  deleteProduct(id: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(() => {
          this.fetchProducts();
        });
      }
    });
  }
}
