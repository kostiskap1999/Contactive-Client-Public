import React from 'react';

import { InfoSection } from './infosection.js';

import '../../../Style/style.css';

import { getPublicContactById } from '../../../Server/Connections/contacts';

import { InfoViewFab } from './infoview-fab';
import { VisibilityButton } from './visibility-button.js';
import { ShareCodeButton } from './sharecode-button.js';
import { ChangeIconButton } from './change-icon-button.js';

//========================================================

export class InfoView extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      contactInfo: this.props.contact,
      nameIsEdited: false,
      showModal: false,
      showIconModal: false
    };

    if(this.state.contactInfo === undefined)
      getPublicContactById(this.props.match.params.contactId)
        .then(async data => {
          let model = require('../../../Model/Contact');
          let contact = new model.Contact(data.contact.id, data.contact.name, data.contact.icon, data.contact.visibility, data.contact.creator, []);
          contact.extractInfoSections(data);
          this.setState({contactInfo: contact})
          this.updater = this.state.contactInfo.update.connect (() => this.forceUpdate ());
        })

    this.functions = this.props.functions ? this.props.functions : null;

  }

  toggleShareCodeModal(){
    this.setState({showModal: !this.state.showModal})
  }

  toggleIconModal(){
    this.setState({showIconModal: !this.state.showIconModal})
  }

  handleName = event => {
    let contactInfo = this.state.contactInfo;
    contactInfo.name = event.target.value;
    this.setState({contactInfo: contactInfo});
  };

  componentWillUnmount () {
    let updater = this.updater;
    this.state.contactInfo.update.disconnect (updater);
  }

  add() {
    let model = require('../../../Model/InfoSection.js');
    let key = Math.floor((Math.random() * 10000) + 1);

    let newInfosection = new model.InfoSection("InfoSection " + key, []);
    this.state.contactInfo.add(newInfosection);
    this.forceUpdate();
  }

  edit() {
    this.state.contactInfo.edit()
    this.setState({nameIsEdited:false})
    this.functions.update();
    this.functions.update();
  }

  remove(index) {
    this.state.contactInfo.remove(index);
    this.forceUpdate();
  }

  changeVisibility(visibility) {
    var contactInfo = this.state.contactInfo
    contactInfo.visibility = visibility
    this.setState({contactInfo: contactInfo});
    this.state.contactInfo.edit()
    this.functions.update();
  }


  render(){

    if(this.props.isOwnProfile){
      var infoviewFabFunctions = {
        add: this.add.bind(this),
        removeContact: this.functions.removeContact.bind(this, this.state.contactInfo.id),
        share: this.toggleShareCodeModal.bind(this)
      }
      var visibilityButtonFunctions = {
        changeVisibility: this.changeVisibility.bind(this)
      }
      var sharecodeButtonFunctions = {
        toggleModal: this.toggleShareCodeModal.bind(this)
      }
      var changeIconButtonFunctions = {
        toggleModal: this.toggleIconModal.bind(this),
        update: this.functions.update.bind(this)
      }
    }


    return(
      <div className="info-view">
        {this.state.contactInfo !== undefined && this.state.contactInfo.contacts !== []
          ?
            <div className="flex-column">
              {this.props.isOwnProfile
                &&
                  <>
                    <ShareCodeButton contactID={this.state.contactInfo.id} show={this.state.showModal} functions={sharecodeButtonFunctions} />
                    <ChangeIconButton contact={this.state.contactInfo} show={this.state.showIconModal} functions={changeIconButtonFunctions} />
                  </>
              }
              <div className="flex-row info-name">
                {this.props.isOwnProfile
                  ?
                    <button
                      className= "icon-div"
                      style={{border: "1px solid rgba(0, 0, 0, .05)"}}
                      onClick={() => this.toggleIconModal()}
                    >
                      {this.state.contactInfo.icon
                        ?
                          <img className= "icon" src={`data:image/jpeg;base64,${this.state.contactInfo.icon}`} alt="" />
                        :
                          <span className= "fas fa-user-circle icon" />
                      }
                    </button>
                  :  
                    <div
                      className= "icon-div"
                      style={{backgroundColor: "rgb(129, 129, 129)"}}
                    >
                      {this.state.contactInfo.icon
                        ?
                          <img className= "icon" src={`data:image/jpeg;base64,${this.state.contactInfo.icon}`} alt="" />
                        :
                          <span className= "fas fa-user-circle icon" />
                      }
                    </div>             
                }

                <div>
                  {this.state.nameIsEdited
                    ?
                      <div className="flex-row" style={{margin:"0 30px 30px"}}>
                        <input 
                          defaultValue={this.state.contactInfo.name}
                          className="name-is-edited transparent-background"
                          onChange={this.handleName}
                        />
                        <button
                          className="transparent-background"
                          onClick={() => this.edit()}
                        >
                          <span className="fas fa-check" style={{margin: "auto 0px auto 20px"}} aria-hidden="true" />
                        </button>
                      </div>
                    :
                      <div>
                        <span className="name">
                          {this.state.contactInfo.name}
                        </span>
                        {this.props.isOwnProfile
                          &&
                            <>
                              <button
                                className="transparent-background"
                                style={{color:"grey", fontSize:"15px"}}
                                onClick={() => this.setState({nameIsEdited:true})}
                              >
                                <span className="fas fa-edit" />
                              </button>

                              <VisibilityButton contactVisibility={this.state.contactInfo.visibility} functions={visibilityButtonFunctions} />
                            </>
                        }
                      </div>
                    }
                </div>
                                
              </div>

              {this.props.isOwnProfile
                  &&
                    <InfoViewFab visibility={this.state.contactInfo.visibility} functions={infoviewFabFunctions} />
                }

              <div className="window-view">
                {this.state.contactInfo.infosections.map((infosection, index) => 
                    <InfoSection
                      key={Math.floor((Math.random() * 10000) + 1)}
                      isOwnProfile={this.props.isOwnProfile}
                      infosection={infosection}
                      contactId={this.state.contactInfo.id}
                      removefunction= {() => this.remove(index)}
                    />
                )}
              </div>

            </div>
          :
          <h2>Fetching data...</h2>
        }
      </div>
    );
  }
}