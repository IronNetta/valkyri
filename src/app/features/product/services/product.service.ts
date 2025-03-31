import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCreateFormModel} from '../models/product-create-form.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  create(product: ProductCreateFormModel) {
    return null;
  }
}
