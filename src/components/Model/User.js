import { extractContact } from "../Server/Extractors/ExtractContact";
import { deleteContact, getContacts, patchContact } from "../Server/Connections/contacts";
import { Event } from "./Util/Event";
// import {UserSettings} from './UserSettings';

export class User {
  constructor(username, email, id, ...contacts) {
    this.username = username;
    this.email = email;
    this.id = id;
    this.contacts = [];
    contacts[0].forEach((c) => this.initialise(c));
    // this.settings = new UserSettings (this); //if user is json stringified, this creates cyclic object value
  }

  update = new Event();

  initialise(contact) {
    this.contacts.push(contact);
    this.update.connect(() => contact.update.dispatch());
    this.update.dispatch();
  }

  addContact(contact) {
    this.contacts.push(contact);
    this.update.connect(() => contact.update.dispatch());
    this.update.dispatch();
  }

  editContact(contactId) {
    for (let i = 0; i < this.contacts.length; i++)
      if (contactId === this.contacts[i].id) {
        patchContact(this.contacts[i]);
        this.update.dispatch();
        break;
      }
  }

  removeContact(contactId) {
    for (let i = 0; i < this.contacts.length; i++)
      if (contactId === this.contacts[i].id) {
        deleteContact(contactId);
        this.contacts.splice(i, 1);
        break;
      }

    this.update.dispatch();
  }

  async fetchContacts() {
    var contacts = await getContacts();

    this.contacts = await Promise.all(
      contacts.map(async (contact) => {
        return await extractContact(contact);
      })
    );
  }
}
