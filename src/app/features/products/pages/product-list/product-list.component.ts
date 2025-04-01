import { Component, effect, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDtoModel } from '../../models/product-dto.model';
import {Router, RouterLink} from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgForOf } from '@angular/common';
import { Card } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    TableModule,
    FormsModule,
    ButtonDirective,
    InputText,
    NgForOf,
    Card,
    PaginatorModule,
    RouterLink
  ],
  providers: [ConfirmationService]
})
export class ProductListComponent {
  products = signal<ProductDtoModel[]>([]);
  filteredProducts = signal<ProductDtoModel[]>([]);
  paginatedProducts = signal<ProductDtoModel[]>([]);
  searchQuery = signal<string>('');
  itemsPerPage = signal<number>(4);
  currentPage = signal<number>(0);

  constructor(
      private productService: ProductService,
      private router: Router,
      private confirmationService: ConfirmationService
  ) {
    // Effet qui met à jour la pagination quand filteredProducts change
    effect(() => {
      this.paginate({ first: 0, rows: this.itemsPerPage() });
    });

    // Chargement des produits au montage du composant
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products.set(data);
      this.filteredProducts.set(data);
    });
  }

  filterProducts(): void {
    this.filteredProducts.set(
        this.products().filter(product =>
            product.nom.toLowerCase().includes(this.searchQuery().toLowerCase())
        )
    );
    this.paginate({ first: 0, rows: this.itemsPerPage() }); // Réinitialisation de la pagination
  }

  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedProducts.set(this.filteredProducts().slice(start, end));
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
