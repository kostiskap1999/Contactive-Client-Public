import React from 'react';

import '../../../Style/style.css';

//========================================================

export class InfoViewFab extends React.Component {
  
  constructor(props){
    super(props);

    this.functions = this.props.functions ? this.props.functions : null;
  }

  render(){

    return(
      <div className="fab-container">
        <div className="fab shadow">
          <div className="fab-content">
            <span className="fas fa-ellipsis-v" />
          </div>
        </div>
        {this.props.visibility !== 0
          &&
            <button
              className="sub-button shadow"
              title="Share Code"
              onClick={() => this.functions.share()}
            >
              <span className="fas fa-share-alt" />
            </button>
        }
        <button
          className="sub-button shadow"
          title="Delete Entry"
          onClick={() => this.functions.removeContact()}
        >
          <span className="fas fa-trash" />
        </button>
        <button
          className="sub-button shadow"
          title="Add InfoSection"
          onClick={() => this.functions.add()}
        >
          <span className="fas fa-plus" />
        </button>
      </div>
    );
  }
}