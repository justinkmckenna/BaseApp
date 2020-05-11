import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    private url = '/api/products';

    constructor(private http: HttpClient) { }

    async getProducts() {
        return await this.http.get<Product[]>(this.url).toPromise();
    }

    async getProduct(contactId) {
        return await this.http.get<Product>(this.url + '/' + contactId).toPromise();
    }

    async createProduct(newContact) {
        return await this.http.post<Product>(this.url, newContact).toPromise();
    }

    async deleteProduct(delContactId) {
        return await this.http.delete<string>(this.url + '/' + delContactId).toPromise();
    }

    async updateProduct(putContact) {
        return await this.http.put<Product>(this.url + '/' + putContact._id, putContact).toPromise();
    }
}