import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCreateFormModel} from '../models/product-create-form.model';
import {environment} from '../../../../environments/environment';
import {ProductDetailsDtoModel} from '../models/product-details-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  create(product: ProductCreateFormModel) {
    return this._http.post<ProductDetailsDtoModel>(environment.API_URL + '/products', product);
  }

  update(product: ProductCreateFormModel) {
    return this._http.put<ProductDetailsDtoModel>(environment.API_URL + '/products', product);
  }

  findByID(id: number) {
    return this._http.get<ProductDetailsDtoModel>(`${environment.API_URL}/products/${id}`);
  }
  public getAllProducts() {
    return this._http.get<ProductDetailsDtoModel[]>(`${environment.API_URL}/product`);
  }

  public deleteProduct(id: number) {
    return this._http.delete<void>(`${environment.API_URL}/product/${id}`);
  }

}
