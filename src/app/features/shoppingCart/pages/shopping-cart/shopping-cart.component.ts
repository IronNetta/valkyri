import { Component, effect, inject } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { PanierDtoModel } from '../../models/panier-dto.model';
import { MessageService } from 'primeng/api';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  imports: [
    Card,
    TableModule,
    NgIf,
    Button,
    DropdownModule,
    Toast
  ],
  providers: [MessageService]
})
export class ShoppingCartComponent {
  private cartService = inject(ShoppingCartService);
  private messageService = inject(MessageService);

  cart: PanierDtoModel | null = null;
  userId = '550e8400-e29b-41d4-a716-446655440000';

  constructor() {
    this.loadCart();

    effect(() => {
      this.cart = this.cartService.cart();
    });
  }

  loadCart() {
    this.cartService.getCart(this.userId);
  }

  removeCart() {
    if (this.cart) {
      this.cartService.deleteCart(this.cart.idPanier);
      this.messageService.add({ severity: 'warn', summary: 'Panier supprimé', detail: 'Votre panier a été supprimé.' });
    }
  }

  updateStatus(newStatus: string) {
    if (this.cart) {
      this.cartService.updateCartStatus(this.cart.idPanier, newStatus);
      this.messageService.add({ severity: 'info', summary: 'Statut mis à jour', detail: `Statut changé en ${newStatus}.` });
    }
  }
}
