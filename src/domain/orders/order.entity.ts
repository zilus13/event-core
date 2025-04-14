// src/domain/orders/order.entity.ts

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  SHIPPED = 'shipped',
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number; // Precio unitario del producto
}

export class Order {
  public readonly id: string;
  public customer: string;
  public products: OrderProduct[];
  public total: number;
  public status: OrderStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    customer: string,
    products: OrderProduct[],
    status: OrderStatus = OrderStatus.PENDING,
  ) {
    this.id = id;
    this.customer = customer;
    this.products = products;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    // Calcula el total en el constructor o mediante un método aparte.
    this.total = this.calculateTotal();
  }

  // Método para calcular el total de la orden
  calculateTotal(): number {
    // Suma el precio * cantidad para cada producto
    return this.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }

  // Método para validar stock (la lógica puede depender de una consulta a un DomainService)
  validateStock(getStockForProduct: (productId: string) => number): boolean {
    for (const product of this.products) {
      if (getStockForProduct(product.productId) < product.quantity) {
        return false;
      }
    }
    return true;
  }

  // Método para aplicar un descuento a la orden
  applyDiscount(discountPercentage: number): void {
    if (discountPercentage > 0 && discountPercentage < 100) {
      this.total = this.total * (1 - discountPercentage / 100);
      this.updatedAt = new Date();
    }
  }

  // Método para cambiar de estado, con validación interna
  changeStatus(newStatus: OrderStatus): void {
    // Ejemplo: No se puede confirmar una orden cancelada
    if (
      this.status === OrderStatus.CANCELLED &&
      newStatus !== OrderStatus.CANCELLED
    ) {
      throw new Error('Una orden cancelada no puede cambiar a otro estado');
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}
