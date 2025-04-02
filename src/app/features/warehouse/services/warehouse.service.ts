import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {WarehouseDtoModel} from '../models/warehouse-dto.model';
import {WarehouseFormDtoModel} from '../models/warehouse-form-dto.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  public getAllWarehouses() {
    return this._http.get<WarehouseDtoModel[]>(`${environment.API_URL}/warehouse`);
  }

  public create(warehouse: WarehouseFormDtoModel) {
    return this._http.post<WarehouseFormDtoModel>(`${environment.API_URL}/warehouse`, warehouse);
  }

  public delete(id: number) {
    return this._http.delete<void>(`${environment.API_URL}/warehouse/${id}`);
  }
}
