import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/app.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  providers: [ContactService]
})

export class ContactsComponent implements OnInit {

  contacts: Contact[]
  selectedContact: Contact

  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contactService.getContacts().then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            }
          }
          return contact;
        });
      });
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact
  }

  emptyContact() {
    var contact: Contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }

  deleteContact = (id: String) => {
    var i = this.getIndexOfContact(id);
    if (i !== -1) {
      this.contacts.splice(i, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  private getIndexOfContact = (id: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === id;
    });
  }
}