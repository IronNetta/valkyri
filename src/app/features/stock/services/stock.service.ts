import {inject, Injectable} from '@angular/core';
import {ProductDetailsDtoModel} from '../../products/models/product-details-dto.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StockDetailsDto} from '../models/stock-details-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  public getAllStocks() {
    return this._http.get<StockDetailsDto[]>(`${environment.API_URL}/stock`);
  }
  public getLowStock(threshold: number = 5) {
    let params = new HttpParams()
      .set('threshold', threshold);
    return this._http.get<StockDetailsDto[]>(`${environment.API_URL}/stock/low`, {params});
  }


}
