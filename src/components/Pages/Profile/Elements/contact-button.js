import React from 'react';
import '../../../Style/style.css';

//========================================================

export class ContactButton extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      contact: this.props.contact
    };
    this.functions = this.props.functions;

  }

  render() {
    
    return(
      <button
        className="contact-button"
        onClick={() => this.props.parentPage === "sidebar" && this.functions.changePersona(this.state.contact.id)}
      >
        <div className="flex-row contact-info">
          <div className= "icon-div">
            {this.state.contact.icon
              ?
                <img className= "icon" src={`data:image/jpeg;base64,${this.state.contact.icon}`} />
              :
                <span className= "fas fa-user-circle icon" />
            }
          </div>
          <span className="contact-name">{this.state.contact.name}</span>
          <div
            className="contact-remove-button"
            onClick={() => this.functions.removeContact(this.state.contact.id)}
          >
            <span className="fas fa-trash" />
          </div>
        </div>

        {this.props.parentPage === "sidebar"
          &&
            <div className="flex-row contact-icon">
              {this.state.contact.visibility !== 0
                &&
                  <>
                    <div className="persona-icon">
                      
                      {this.state.contact.visibility === 1
                        ?
                          <span> private </span>
                        :
                          <span> public </span>
                      }
                    </div>
                    {this.props.profile.id === this.state.contact.creator
                      &&
                        <div className="self-persona-icon">
                          <span> me </span>
                        </div>
                    }
                  </>
              }
            </div>
        }
      </button>
    );
  }
}