import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

//========================================================

export class InfoSection extends React.Component {


    constructor(props) {
      super(props);

      this.state = {
        infosectionInfo: this.props.infosection,
        infoname: "",
        infoIsEdited: this.falsifyInfoIsEdited(),
        nameIsEdited: false,
        addInfoFormVisible: false
      };

      this.updater = this.state.infosectionInfo.update.connect (() => this.forceUpdate ());
    }
    
    componentWillUnmount () {  
      let updater = this.updater;
      this.state.infosectionInfo.update.disconnect (updater);
    }

    falsifyInfoIsEdited() {
      let infoIsEdited = [];
      for(let i = 0; i < this.props.infosection.info.length; i++)
        infoIsEdited[i] = false;
      return infoIsEdited;
    }

    infoIsBeingEdited(index) {
      let infoIsEdited = this.state.infoIsEdited;
      if (infoIsEdited[index])
        return true
      else
        return false
    }

    individualiseEditField(index = null) {

      let isEditingInfo = index != null ? true : false;
      let infoIsEdited = this.state.infoIsEdited;

      for(let i = 0; i < this.state.infosectionInfo.info.length; i++)
        infoIsEdited[i] = false;
      
      if(index === this.state.infosectionInfo.info.length)
        this.setState({addInfoFormVisible: true});
      else
        this.setState({addInfoFormVisible: false});
      
      if(isEditingInfo)
        infoIsEdited[index] = true;
            
      this.setState({infoIsEdited:infoIsEdited});
      this.setState({nameIsEdited:!isEditingInfo});
    }
        
    add() {
      if(this.state.infoname===""){
        alert("Enter a valid info name");
        return;
      }
      
      this.state.infosectionInfo.add(this.state.infoname, this.props.contactId);

      this.setState({infoname:""});
      this.individualiseEditField(-1);
      this.forceUpdate(); 
    }

    remove(index) {
      let model = require('../../../Model/InfoSection.js');
      let uneditedInfo = new model.InfoSection(this.state.infosectionInfo.name, this.state.infosectionInfo.info);

      this.state.infosectionInfo.remove(uneditedInfo, index, this.props.contactId);
      
      this.individualiseEditField(-1);
      this.forceUpdate();
    }

    startEditing(index = null) {
      let isEditingInfo = index != null ? true : false;
      let infosectionInfo = this.state.infosectionInfo;
      let infoname = isEditingInfo ? infosectionInfo.info[index] : infosectionInfo.name;

      this.setState({infoname: infoname})
      this.individualiseEditField(index && index);
    }

    handleEditing = event => {
      this.setState({ infoname: event.target.value });
    };

    endEditing(index) {
      let isEditingInfo = index != null ? true : false;
      
      if(this.state.infoname===""){
        alert("Enter a valid info name");
        return;
      }

      this.individualiseEditField(-1);

      let model = require('../../../Model/InfoSection.js');
      let uneditedInfo = new model.InfoSection(this.state.infosectionInfo.name, this.state.infosectionInfo.info);
          
      if(isEditingInfo)
        this.state.infosectionInfo.editInfo(uneditedInfo, this.state.infoname, index, this.props.contactId);  
      else
        this.state.infosectionInfo.editName(uneditedInfo, this.state.infoname, this.props.contactId);  
              
      this.setState({addInfoFormVisible:false});
      this.setState({infoname: ""});
      this.forceUpdate();
    }
      
    render() {

      return (
        <div className="info-box">
  
          <div className="info-title-bar">

            {this.state.nameIsEdited
              ?
                <div className="flex-row info-title" >
                  <input 
                    defaultValue={this.state.infosectionInfo.name}
                    className="transparent-background"
                    onChange={this.handleEditing}
                  />
                  <button
                    className="transparent-background"
                    onClick={() => this.endEditing()}
                  >
                    <span className="fas fa-check" aria-hidden="true" />
                  </button>
                </div>
              :
                <div className="flex-row">
                  <div className="info-title">
                    <span>{this.state.infosectionInfo.name}</span>
                    {this.props.isOwnProfile
                      &&
                        <button
                          className="transparent-background"
                          onClick={() => this.startEditing()}
                        >
                          <span className="fas fa-edit" />
                        </button>
                    }
                  </div>

                  <span className="nav-divider" />
                
                  {this.props.isOwnProfile
                    &&
                      <div className="info-title-buttons" >

                        <button
                          className="transparent-background"
                          onClick={() => this.individualiseEditField(this.state.infosectionInfo.info.length)}
                        >
                          <span className="fas fa-plus" />
                        </button>
                        <OverlayTrigger
                          trigger="click"
                          placement="bottom"
                          overlay={
                            <Popover>
                              <Popover.Content>
                                <p>Are you sure you want to delete this info section?</p>
                                <Button variant="primary" className="transparent-background" style={{color:"black"}} onClick={this.props.removefunction}> Yes </Button>
                              </Popover.Content>
                            </Popover>
                        }
                        >
                          <button
                            className="transparent-background"
                          >
                            <span className="far fa-trash-alt" style={{cursor:"pointer"}} />
                          </button>
                          
                        </OverlayTrigger>
                      </div>
                  }
                </div>
            }
          </div>
  
          <Dropdown.Divider />
  
          <div>
            {this.state.infosectionInfo.info.map( (i, index) =>
              <div key={index}>
              {this.infoIsBeingEdited(index)
                ?
                  <div style={{margin:"0 30px 30px"}} >
                    <input 
                      defaultValue={i} 
                      onChange={this.handleEditing}
                    />
                    <div style={{float:"right"}}>
                      <button
                        className="transparent-background"
                        onClick={() => this.endEditing(index)}
                      >
                        <span className="fas fa-check" aria-hidden="true" />
                      </button>
                      <button
                        className="transparent-background"
                        onClick={() => this.remove(index)}
                      >
                        <span className="far fa-trash-alt" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                :
                  <div
                    key={index}
                    className="info"
                  >
                    {i}
                    {this.props.isOwnProfile
                      &&
                        <button
                          className="transparent-background"
                          style={{float:"right"}}
                          onClick={() => this.startEditing(index)}
                        >
                          <span className="far fa-edit" aria-hidden="true" />
                        </button>
                    }
                  </div>
              }
              </div>
            )}
          </div>
  
          {this.state.addInfoFormVisible
            &&
              <div
                style={{margin:"0 30px 30px"}}
              >
                <input 
                  onChange={this.handleEditing}
                />
                <div style={{float:"right"}}>
                  <button
                    className="transparent-background"
                    onClick={() => this.add()}
                  >
                    <span className="fas fa-check" aria-hidden="true" />
                  </button>
                  <button
                    className="transparent-background"
                    onClick={() => this.setState({addInfoFormVisible:false})}
                  >
                    <span className="far fa-trash-alt" aria-hidden="true" />
                  </button>
                </div>
                
              </div>
          }  
        </div>
      );
    }
  }