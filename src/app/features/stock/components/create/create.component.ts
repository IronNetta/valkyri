import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../../products/services/product.service';
import {StockService} from '../../services/stock.service';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {NgForOf} from '@angular/common';
import {AuthService} from '../../../auth/services/auth-service';
import {UserSessionDto} from '../../../auth/models/user-token-dto';
import {DropdownModule} from 'primeng/dropdown';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-create',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    Button,
    DropdownModule,
    InputText
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _stockService: StockService = inject(StockService);
  private readonly _productService: ProductService = inject(ProductService);
  private readonly _authService: AuthService = inject(AuthService);


  stockForm: FormGroup;
  produits: any[] = [];
  users: UserSessionDto[] = [];


  constructor() {
    this.stockForm = this._fb.group({
      quantiteDisponible: [null, [Validators.required, Validators.min(0)]],
      produitId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
    this.fetchProducts();
    this.fetchUsers();

  }

  fetchProducts(): void {
    this._productService.getAllProducts().subscribe((data) => {
      this.produits = data;
    });
  }

  fetchUsers(): void {
    this._authService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users)
    });
  }

  submit() {

    this.stockForm.markAllAsTouched();

    if(this.stockForm.invalid) {
      return;
    }

    this._stockService.create(this.stockForm.value).subscribe({
      next: () => {
        this._router.navigate(['/stock']);
        console.log("Creating Stock");
      },
      error: (error) => {
        console.error('Erreur lors de la création du stock :', error);
        console.log('Données envoyées :', this.stockForm.value);

      }
    });
  }


}
