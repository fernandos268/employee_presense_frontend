import React, { Component } from 'react';
import { isLoggedIn, removeToken, decodeToken } from './Auth';
export default function WithAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor() {
      super();

      this.state = {
        tokenContent: null,
      };
    }
    componentWillMount() {
      if (!isLoggedIn()) {
        this.props.history.replace('/signin');
      } else {
        try {
          const tokenContent = decodeToken();
          this.setState({
            tokenContent: tokenContent,
          });
        } catch (err) {
          removeToken();
          this.props.history.replace('/signin');
        }
      }
    }

    render() {
      if (this.state.tokenContent) {
        return (
          <AuthComponent
            {...this.props}
            history={this.props.history}
            tokenContent={this.state.tokenContent}
          />
        );
      } else {
        return null;
      }
    }
  };
}
