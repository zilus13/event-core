// src/domain/orders/order.entity.ts
export class Order {
  constructor(
    public readonly id: string,
    public customer: string,
    public products: { productId: string; quantity: number }[],
    public total: number,
  ) {}

  // Método de validación, cálculo, etc.
  calculateTotal(pricing: Record<string, number>): number {
    return this.products.reduce(
      (acc, item) => acc + pricing[item.productId] * item.quantity,
      0,
    );
  }
}
