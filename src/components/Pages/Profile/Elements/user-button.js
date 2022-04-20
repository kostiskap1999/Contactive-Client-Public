import React from 'react';
import '../../../Style/style.css';

import { fetchLogout } from '../../../Server/Connections/connect';
//========================================================

export class UserButton extends React.Component {

  constructor(props){
    super(props)
    
    this.state = this.props.state;
    this.showOptions = false;

    this.smallScreen = this.props.smallScreen;    
    this.updateSmallScreen = this.updateSmallScreen.bind(this);

  }

  componentDidMount() {
      this.updateSmallScreen();
      window.addEventListener('resize', this.updateSmallScreen);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.updateSmallScreen);
  }

  updateSmallScreen() {      
      this.smallScreen = this.props.smallScreen
      this.sidebarAppear = this.props.smallScreen;
      this.forceUpdate();
  }

  toggleUserOptions() {
    this.showOptions = !this.showOptions;
    this.forceUpdate();
  }



  render() {

    return(
      <div className={this.props.smallScreen ? "" : "user-button-div flex-column" }>
        <button
          className={this.props.smallScreen ? "small-screen-button" : "user-button"}
          onClick={() => this.toggleUserOptions()}
        >
          <span>{this.props.smallScreen ? this.state.profileData.username[0] : this.state.profileData.username}</span>
        </button>
        
        {this.showOptions
          &&
            <div className={this.props.smallScreen ? "user-options small-screen-user-options" : "user-options" }>
              <a href="#Link1">User Settings</a>
              <a href="#Logout" onClick={() => fetchLogout()}>Logout</a>
            </div>
        }
      </div>      
    );
  }
}