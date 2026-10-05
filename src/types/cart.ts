export interface CartItem {
  productId: number | string;
  quantity: number;
  color: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountAwayFromFreeShipping: number;
  hasFreeShipping: boolean;
}
