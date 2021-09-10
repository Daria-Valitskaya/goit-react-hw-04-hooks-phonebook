import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import Section from "./Components/Section/Section";

export default function App() {
  

  const [filter, setFilter] = useState('')
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
  };

  componentDidMount() {
    const contact = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contact);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

const  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  const onAddContact = (name, number ) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      return this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };
 const onChangeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };
 const filteredVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

    const { filter } = this.state;


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
