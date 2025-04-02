import {ProductDetailsDtoModel} from '../../products/models/product-details-dto.model';
import {UserSessionDto} from '../../auth/models/user-token-dto';

export interface StockDetailsDto {
  id: number;
  quantiteDisponible: number;
  produitId: ProductDetailsDtoModel;
  userId: UserSessionDto;
}
