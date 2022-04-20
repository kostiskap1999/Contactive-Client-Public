import React from 'react';


import '../../../Style/style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { getPrivateContactKey } from '../../../Server/Connections/contacts';

//========================================================
const CLIENTNAME = window.location.protocol + "//" + window.location.host

export class ShareCodeButton extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      contactID: this.props.contactID,
      shareLink: ""
    }

    getPrivateContactKey(this.state.contactID)
    .then(data => {
      data = data.split('"') //split is necessary since the response comes in " "
      this.setState({shareLink: CLIENTNAME + "/join/" + data[1]})
    })

    this.functions = this.props.functions;

  }

  copy = async () => {
    
    if(window.isSecureContext)
      await navigator.clipboard.writeText(this.state.shareLink);
  }

  render(){
      
    return(
      <Modal show={this.props.show} onHide={() => this.functions.toggleModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Join Persona</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Share the link of your persona to let people join it.</span>
        <div className="flex-row">
          <FormControl
            value={this.state.shareLink}
            readOnly
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={this.copy}
            disabled={!(this.state.shareLink && window.isSecureContext)}
          >
            Copy To Clipboard
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    )
  }
}