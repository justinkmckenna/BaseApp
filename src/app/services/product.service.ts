import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
    private url = '/api/products';

    constructor(private http: HttpClient) { }

    async getProducts() {
        return await this.http.get<Product[]>(this.url).toPromise();
    }

    async getProduct(id: string) {
        return await this.http.get<Product>(this.url + '/' + id).toPromise();
    }

    async createProduct(product: Product) {
        return await this.http.post<Product>(this.url, product).toPromise();
    }

    async deleteProduct(id: string) {
        return await this.http.delete<string>(this.url + '/' + id).toPromise();
    }

    async updateProduct(product: Product) {
        return await this.http.put<Product>(this.url + '/' + product._id, product).toPromise();
    }

    async addPictures(pictures: FormData) {
        console.log(pictures)
        return await this.http.post<File[]>(this.url + '/addPictures', pictures).toPromise();
    }

    async deletePictures(pictures: File[]) {
        return await this.http.post<File[]>(this.url + '/deletePictures', pictures).toPromise();
    }
}