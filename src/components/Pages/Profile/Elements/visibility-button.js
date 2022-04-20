import React from 'react';

import '../../../Style/style.css';

import Dropdown from 'react-bootstrap/Dropdown';
// import { extractUser } from '../../../Server/Extractors/User/ExtractUser.js';


//========================================================

export class VisibilityButton extends React.Component {
  
  constructor(props){
    super(props);

    this.functions = this.props.functions;

  }

  render(){

    var dropdownName;
    if (this.props.contactVisibility === 0)
      dropdownName = "Local"
    else if (this.props.contactVisibility === 1)
      dropdownName = "Private"
    else
      dropdownName = "Public"
      
    return(
      <>
      <div className="dropdown show" style={{margin:" 15px 0 0 20px"}}>
        <button className="visibility-dropdown" href="#" role="button" id="actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {dropdownName}
        </button>
      
        <div className="dropdown-menu" aria-labelledby="actions">
          <a className="dropdown-item" href="#" role="button" onClick={() => this.functions.changeVisibility(0)}>Local</a>
          <a className="dropdown-item" href="#" role="button" onClick={() => this.functions.changeVisibility(1)}>Private</a>
          <a className="dropdown-item" href="#" role="button" onClick={() => this.functions.changeVisibility(2)}>Public</a>
        </div>
      </div>
    </>
    );
  }
}