// src/infrastructure/orders/orders.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customer: string;

  // Almacenamos el array de productos en formato JSON.
  @Column('json')
  products: { productId: string; quantity: number; price: number }[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
