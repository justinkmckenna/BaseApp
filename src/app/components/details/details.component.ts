import { Component, Input } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/app.service';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
})

export class DetailsComponent {
  @Input() contact: Contact;

  @Input() createHandler: Function;
  @Input() updateHandler: Function;
  @Input() deleteHandler: Function;

  constructor(private contactService: ContactService) { }

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
}