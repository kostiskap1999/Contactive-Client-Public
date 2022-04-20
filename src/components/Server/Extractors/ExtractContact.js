import { Contact } from "../../Model/Contact";

export async function extractContact(contact) {
  return new Contact(
    contact.id,
    contact.name,
    contact.icon,
    contact.visibility,
    contact.creator,
    []
  );
}
