import React from 'react';

import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';

import '../../../Style/style.css';
import { ContactButton } from './contact-button.js';

// import { ContactButton } from '../../../../../public/'
//========================================================

export class SideBar extends React.Component {

  constructor(props){
    super(props)
    
    this.state = this.props.state;
    this.functions = this.props.functions;

  }

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleInput = event => {
    this.setState({ name: event.target.value });
  };

  render() {

    var contactButtonFunctions = {
      changePersona: this.functions.changePersona.bind(this),
      removeContact: this.functions.removeContact.bind(this)
    }

    return(
      <div className="side-bar flex-column">            
        <div className="flex-row search-bar">
          <div>
            <Link to="/" className="transparent-background">
              <img src="  ../../../../../public/logo192.png" alt="logo"></img>
            </Link>
          </div>
          <FormControl
            placeholder="Search a contact from your list"
            style={{padding:"10px", background:"#d8dcda"}}
            onChange={this.handleFilter}
          />
        </div>
        
        <div>
          { this.state.profileData.contacts.filter(contact => contact.name.toUpperCase().includes(this.state.filter.toUpperCase())).map((contact) => {
            return (
              <div key={contact.id}>
                  {<ContactButton profile={this.state.profileData} contact={contact} parentPage={"sidebar"} functions={contactButtonFunctions} />}
              </div>
            );
          })}
        </div>

        <button
          className="fab-button shadow"
          title="Add Contact"
          onClick={() => this.functions.addContact()}
        >
          <span className="fas fa-plus" />
        </button>
      </div>
      
    );
  }
}