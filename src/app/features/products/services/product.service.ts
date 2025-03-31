import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCreateFormModel} from '../models/product-create-form.model';
import {environment} from '../../../../environments/environment';
import {ProductDtoModel} from '../models/product-dto.model';
import {ProductDetailsDtoModel} from '../models/product-details-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  public getAllProducts() {
    return this._http.get<ProductDtoModel[]>(`${environment.API_URL}/product`);
  }

  public findByID(id: number) {
    return this._http.get<ProductDetailsDtoModel>(`${environment.API_URL}/products/${id}`);
  }

  public deleteProduct(id: number) {
    return this._http.delete<void>(`${environment.API_URL}/product/${id}`);
  }

  public create(product: ProductCreateFormModel) {
    return this._http.post<ProductDetailsDtoModel>(environment.API_URL + '/products', product);
  }

  public update(product: ProductCreateFormModel) {
    return this._http.put<ProductDetailsDtoModel>(environment.API_URL + '/products', product);
  }
}
