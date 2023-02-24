import { ProductDtoOutput } from "./productDtoOutput";

export interface ProductsDtoOutput {
    products: ProductDtoOutput[]
    limit: number
    skip: number
    total: number
}