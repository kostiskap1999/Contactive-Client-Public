import React from 'react';

import FileBase64 from 'react-file-base64';

import '../../../Style/style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//========================================================

export class ChangeIconButton extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      contact: this.props.contact,
      loadedIcon: null,
      loadedIcon2: null
    }

    this.functions = this.props.functions;

  }


  getImage(image) {
    if(image){
      var iconBase64 = image.base64.split(",");
      this.setState({loadedIcon: iconBase64[1]});
    }
    else
      this.setState({loadedIcon: null})

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    
    canvas.width = 58; // target width
    canvas.height = 58; // target height

    var imagee = new Image();
    imagee.onload = function(e) {
      ctx.drawImage(imagee, 
          0, 0, imagee.width, imagee.height, 
          0, 0, canvas.width, canvas.height
      );
      // create a new base64 encoding
      var resampledImage = new Image();
      resampledImage.src = canvas.toDataURL();
      // alert("re " + resampledImage.src);
      // this.setState({loadedIcon2: resampledImage.src})
  };

    // alert("og " + iconBase64[1]);
  }

  submitIcon() {
    var contact = this.state.contact;
    contact.icon = this.state.loadedIcon;
    this.setState({contact: contact});
    this.state.contact.edit();
    this.functions.toggleModal();
    this.functions.update();
  }

  removeIcon() {
    var contact = this.state.contact;
    contact.icon = null;
    this.setState({contact: contact});
    this.state.contact.edit();
    this.functions.toggleModal();
  }

  render(){
      
    return(
      <Modal show={this.props.show} onHide={() => this.functions.toggleModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Change Icon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Select a file from your local files.</span>
        <br/>
        <span style={{fontSize: "9px"}}>Does not yet work with images over 10kb.</span>
        <div className="flex-row">
          <FileBase64
          multiple={ false }
          onDone={ this.getImage.bind(this) } />
        </div>
        <div>
          <span>Your image</span>
          {this.state.loadedIcon
            &&
              <>
              <img style={{maxWidth: "100%", maxHeight: "100%"}} src={`data:image/jpeg;base64,${this.state.loadedIcon}`} />
              {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src={`data:image/jpeg;base64,${this.state.loadedIcon2}`} /> */}
              </>
          }

          <div className="flex-row" style={{marginTop: "20px"}}>
            {this.state.loadedIcon
              &&
                  <Button
                    size="sm"
                    variant="secondary"
                    style={{marginRight: "auto"}}
                    onClick={() => this.submitIcon()}
                  >
                    Submit
                  </Button> 
            }
            <Button
              size="sm"
              variant="secondary"
              onClick={ () => {this.removeIcon()}}
            >
              Remove Icon
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    )
  }
}