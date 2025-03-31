import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCreateFormModel} from '../models/product-create-form.model';
import {environment} from '../../../../environments/environment';
import {ProductDtoModel} from '../models/product-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  public getAllProducts() {
    return this._http.get<ProductDtoModel[]>(`${environment.API_URL}/product`);
  }

  public getProduct(id: number) {
    return this._http.get<ProductDtoModel>(`${environment.API_URL}/product/${id}`);
  }

  public deleteProduct(id: number) {
    return this._http.delete<void>(`${environment.API_URL}/product/${id}`);
  }

  public createProduct(product: ProductCreateFormModel) {
    return this._http.post<void>(`${environment.API_URL}/product`, product);
  }

  public updateProduct(id: number, product: ProductCreateFormModel) {
    return this._http.put<void>(`${environment.API_URL}/product/${id}`, product);
  }
}
