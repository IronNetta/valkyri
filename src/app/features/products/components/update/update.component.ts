import {Component, inject} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {

  private readonly _productService: ProductService = inject(ProductService);
  private readonly _router: Router = inject(Router);


  productForm!: FormGroup;


  constructor() {

  }

  getProductById(id:number){

    this._productService.findByID(id);

    if(!this._productService.findByID(id)){
      return;
    }

    this._productService.update(this.productForm.value).subscribe({
      next: ()=> {
        this._router.navigate(['/products/'+id]);
      },
      error: (error)=> {
        console.error(error);
      }
    })
  }


}
