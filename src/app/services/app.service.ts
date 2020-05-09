import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
    private url = '/api/contacts';

    constructor(private http: HttpClient) { }

    async getContacts() {
        return await this.http.get<Contact[]>(`${this.url}`).toPromise();
    }

    async createContact(newContact) {
        return await this.http.post<Contact>(`${this.url}`, newContact).toPromise();
    }

    async deleteContact(delContactId) {
        return await this.http.delete(this.url + '/' + delContactId).toPromise();
    }

    async updateContact(putContact) {
        return await this.http.put(this.url + '/' + putContact._id, putContact).toPromise();
    }
}