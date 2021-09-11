import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import Section from "./Components/Section/Section";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts") ?? []);
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };
  const onAddContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      return setContacts((prevState) => [contact, ...prevState]);
    }
  };
  const onChangeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const filteredVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={onAddContact} />
      </Section>
      <Section>
        <h2>My Contacts</h2>
        <Filter value={filter} onChangeFilter={onChangeFilter} />
      </Section>
      <Section>
        <ContactList
          contacts={filteredVisibleContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}
