import React from "react";

export class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: this.props.errorCode,
      errorMessage: this.props.errorMessage,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.errorCode}</h1>
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}
