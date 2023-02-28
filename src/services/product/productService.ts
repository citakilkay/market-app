import http from '../httpService';
import { ProductDtoOutput } from './dto/productDtoOutput';
import { ProductsDtoOutput } from './dto/productsDtoOutput';

class ProductService {
    async getAll(): Promise<ProductsDtoOutput> {
        const response = await http.get('/products');
        console.log(response, "result")
        return response.data
    }

    async get(id: number): Promise<ProductDtoOutput> {
        const response = await http.get(`/products/${id}`)
        return response.data
    }
}

export default new ProductService()