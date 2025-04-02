import {inject, Injectable} from '@angular/core';
import {ProductDetailsDtoModel} from '../../products/models/product-details-dto.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StockDetailsDto} from '../models/stock-details-dto.model';
import {catchError, forkJoin, map, mergeMap, Observable, of, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  getStocksWithDetails(): Observable<StockDetailsDto[]> {
    return this._http.get<StockDetailsDto[]>(environment.API_URL + '/stock').pipe(
      tap(response => console.log('Réponse API Stock:', response)),
      map(stocks => {
        return stocks.map(stock => ({
          ...stock,
          userName: stock.userNom || 'Utilisateur inconnu',
          productName: stock.produitNom || 'Produit inconnu'
        }));
      }),
      catchError(err => {
        console.error('Erreur dans getStocksWithDetails:', err);
        return throwError(() => new Error('Échec de la récupération des détails de stock'));
      })
    );
  }
  public getAllStocks() {
    return this._http.get<StockDetailsDto[]>(`${environment.API_URL}/stock`);
  }
  public getLowStock(threshold: number = 5) {
    let params = new HttpParams()
      .set('threshold', threshold);
    return this._http.get<StockDetailsDto[]>(`${environment.API_URL}/stock/low`, {params});
  }


}
