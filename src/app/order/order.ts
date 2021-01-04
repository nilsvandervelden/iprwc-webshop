import { Product } from "../products/product-model";

export interface Order {
    createdAt: string
    delivered: boolean
    paid: boolean
    userId: string
    _id: string
    products: Product[]
}