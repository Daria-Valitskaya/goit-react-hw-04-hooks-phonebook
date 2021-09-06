import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";

const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ id, number, name }) => (
      <li key={id} name={name}>
        <ContactItem
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
