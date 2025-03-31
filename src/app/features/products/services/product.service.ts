import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProductSingleDtoModel} from '../models/product-single-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  getOne(){
    return this._http.get<ProductSingleDtoModel>(`${environment.API_URL}/product/:id`);
  }
}
