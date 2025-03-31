import {Component, Input} from '@angular/core';
import {ProductSingleDtoModel} from '../../../models/product-single-dto.model';
import {Button, ButtonModule} from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-single-product-page',
  imports: [
    Button,
    FieldsetModule,
    DividerModule,
    PanelModule,
  ],
  standalone: true,
  templateUrl: './single-product-page.component.html',
  styleUrl: './single-product-page.component.scss'
})
export class SingleProductPageComponent {


  @Input()
  product!: ProductSingleDtoModel;

}
