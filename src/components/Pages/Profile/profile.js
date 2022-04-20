import React from 'react';

import { SideBar } from './Elements/sidebar'
import { InfoView } from './Elements/infoview';

import '../../Style/style.css';

import { extractUser } from '../../Server/Extractors/ExtractUser';
import { UserButton } from './Elements/user-button';
import { postContact } from '../../Server/Connections/contacts';

//========================================================

export class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      profileData: null,
      filter:'',
      contactID: null,
      viewedContact: null,
      fetchedContactIDs: [],

      sidebarAppear: false,
      userOptionsAppear: false
    };

    extractUser()
    .then(async data => {
      await data.fetchContacts();
      this.setState({profileData: data});
    })

    this.changePersona.bind(this);
    this.addContact.bind(this);
    this.removeContact.bind(this);

  }

  
  async changePersona(contactID) {
    var contactList = this.state.profileData.contacts;
    var fetchedContactIDs = this.state.fetchedContactIDs;
    
    //CHECK IF IT WAS ALREADY FETCHED
    for(let i=0; i< fetchedContactIDs.length; i++)
      if(fetchedContactIDs[i] === contactID){
        this.setState({contactID: contactID});
        return;
      }
    
    //IF NOT ATTEMPT TO FETCH IT
      for(let i=0; i< contactList.length; i++)
        if(contactID === contactList[i].id){
          this.setState({fetchedContactIDs: [...this.state.fetchedContactIDs, contactList[i].id]});
          await contactList[i].fetchInfoSections();
          this.setState({contactID: contactID});
          return;
        }
  }

  async addContact() {
    let newContact;
    let model = require('../../Model/Contact');
    
    var contactJSON = {
      "name": "New Contact",
      "icon": null,
      "visibility": 0
    }

    var newFetchedContact = await postContact([contactJSON]);

    newContact = new model.Contact(newFetchedContact[0].id, newFetchedContact[0].name, newFetchedContact[0].icon, newFetchedContact[0].visibility, newFetchedContact[0].creator, []);
    this.state.profileData.addContact(newContact);
    this.forceUpdate();
  }

  removeContact(contactId) {
    this.state.profileData.removeContact(contactId);
    this.forceUpdate();
  }

  // SMALL SCREEN FUNCTIONS
  toggleSidebar() {
    this.setState({sidebarAppear: !this.state.sidebarAppear});
    this.setState({userOptionsAppear: false});
    this.forceUpdate();
  }

  toggleUserOptions() {
    this.setState({userOptionsAppear: !this.state.userOptionsAppear});
    this.setState({sidebarAppear: false});
    this.forceUpdate();
  }

  update() {
    this.forceUpdate();
  }

  render() {

    var sidebarFunctions = {
      changePersona : this.changePersona.bind(this),
      addContact : this.addContact.bind(this),
      removeContact: this.removeContact.bind(this)
    };

    var infoviewFunctions = {
      removeContact: this.removeContact.bind(this),
      update: this.update.bind(this)
    }

    return (
      <>
        {this.state.profileData != null
          ?
            <div className="flex-row">
              {this.props.smallScreen
                ?
                  <>
                    <ul className="small-screen-nav">
                      <li>
                        <button
                          onClick={() => this.toggleSidebar()}
                          className="fas fa-bars small-screen-button"
                        />
                      </li>
                      <li>
                        <UserButton smallScreen={this.props.smallScreen} state={this.state} />
                      </li>
                    </ul>
                  

                    {this.state.sidebarAppear
                      &&
                        <SideBar smallScreen={this.props.smallScreen} state={this.state} functions={sidebarFunctions} />
                    }
                  </>
                :
                  <>
                    <SideBar smallScreen={this.props.smallScreen} state={this.state} functions={sidebarFunctions} />
                    <UserButton smallScreen={this.props.smallScreen} state={this.state} />
                  </>
              }

              {/* eslint-disable-next-line */}
              {this.state.profileData.contacts.map( (contact) => {
                if(this.state.contactID === contact.id) {
                  return (
                    <InfoView key={contact.id} isOwnProfile={this.state.profileData.id === contact.creator} contact={contact} functions={infoviewFunctions}/>
                  );
                }
              })}
              
            </div>
          :
            <h2>Fetching data...</h2>
        }
        
      </>
    );
  }
}