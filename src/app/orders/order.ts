import { Product } from "../products/product-model";

export interface Order {
    _id: string
    createdAt: string
    delivered: boolean
    paid: boolean
    userId: string
    products: Product[]
}