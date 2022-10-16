import { Component } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { Wrapper } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filte/Filter';
import { ContactList } from './ContactList/ContactList';

// const id = nanoid(15);
Notiflix.Notify.init({
  width: '500px',
  position: 'center-top',
  closeButton: true,

  fontSize: '24px',
  warning: {
    // background: 'rgb(255, 240, 245)',
    textColor: 'rgb(219, 40, 49)',
    notiflixIconColor: 'rgb(219, 40, 49)',
  },
});

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  componentDidMount(){
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
       this.setState({ contacts: parsContacts });
    }
   
  }

componentDidUpdate(prevProps,prevStats){
 
  if (this.state.contacts !== prevStats.contacts ) {
   
    localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
  }
}

  delitContact = idDelited => {
    const updatedContacts = this.state.contacts.filter(
      ({ id }) => id !== idDelited
    );
    this.setState({ contacts: updatedContacts });
  };

  findContactByName = name => {
    const { contacts } = this.state;
    return contacts.find(item => item.name.toLowerCase() === name);
  };

  formSabmit = data => {
    const { name, number } = data;
    const normalizedName = name.toLowerCase();
    if (this.findContactByName(normalizedName)) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    }
    this.addContact(name, number);
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;

    const visibleContactChange = this.getVisibleContact();

    return (
      <Wrapper>
        <ContactForm onSabmitForm={this.formSabmit} />
        <Filter
          value={filter}
          onChange={this.changeFilter}
          title="Find contacts by name"
        />
        {contacts.length > 0 && (
          <ContactList
            title="Contacts"
            contacts={visibleContactChange}
            hendleDelit={this.delitContact}
          />
        )}
      </Wrapper>
    );
  }
}
