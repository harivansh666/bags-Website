export type OrderStatus = "Confirmed" | "Packed" | "Shipped" | "Delivered";

export interface OrderLineItem {
  productId: number | string;
  quantity: number;
  color: string;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  items: OrderLineItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    pincode: string;
  };
}
