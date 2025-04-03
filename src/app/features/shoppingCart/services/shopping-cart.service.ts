import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PanierDtoModel } from '../models/panier-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly _http: HttpClient = inject(HttpClient);
  cart = signal<PanierDtoModel | null>(null); // Stocke le panier complet

  constructor() { }

  public getCart(userId: string) {
    this._http.get<PanierDtoModel>(`${environment.API_URL}/api/paniers/${userId}`)
      .subscribe(data => this.cart.set(data));
  }

  public addToCart(panierId: string, productId: string) {
    this._http.post(`${environment.API_URL}/api/paniers/${panierId}/ajouter-produit`, { produitId: productId })
      .subscribe(() => this.getCart(panierId));
  }

  public updateCartStatus(panierId: string, statut: string) {
    this._http.put(`${environment.API_URL}/api/paniers/${panierId}`, { statut })
      .subscribe(() => this.getCart(panierId));
  }

  public deleteCart(panierId: string) {
    this._http.delete(`${environment.API_URL}/api/paniers/${panierId}`)
      .subscribe(() => this.cart.set(null));
  }
}
