import type { Order } from "@/types/order";
import type { CartItem } from "@/types/cart";
import { MOCK_PRODUCTS } from "./productsApi";

export const ordersApi = {
  async createOrder(cart: CartItem[]): Promise<Order> {
    const items = cart.map((line) => {
      const p = MOCK_PRODUCTS.find((x) => x.id === line.productId);
      return {
        productId: line.productId,
        quantity: line.quantity,
        color: line.color,
        price: p?.price ?? 0,
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      id: `MRW-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
      status: "Confirmed",
      items,
    };

    return new Promise((resolve) => setTimeout(() => resolve(newOrder), 300));
  },

  async getOrderById(id: string): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          date: "14 September 2026",
          itemCount: 3,
          total: 2499,
          status: "Delivered",
          items: MOCK_PRODUCTS.slice(0, 3).map((p) => ({
            productId: p.id,
            quantity: 1,
            color: "Black",
            price: p.price,
          })),
        });
      }, 100);
    });
  },
};
