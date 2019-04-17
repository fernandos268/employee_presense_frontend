// import React, { Component } from 'react';
// import { isLoggedIn, decodeToken } from './Auth';
// export default function AuthWrapper(WrappedComponent) {
//   return class AuthWrapped extends Component {
//     constructor() {
//       super();
//     }
//     componentWillMount() {
//       if (!isLoggedIn) {
//         this.props.history.replace('/signin');
//       }
//     }

//     render() {
//       console.log(this.props.history);
//       const decodedToken = decodeToken();
//       if (decodedToken) {
//         return (
//           <WrappedComponent
//             {...this.props}
//             history={this.props.history}
//             decodedToken={decodedToken}
//           />
//         );
//       } else {
//         return null;
//       }
//     }
//   };
// }

import React, { Component } from 'react';
import { isLoggedIn, removeToken, decodeToken } from './Auth';
export default function WithAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor() {
      super();

      this.state = {
        tokenContent: null,
        isRememberMe: false,
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
            rememberMe: tokenContent.rememberMe,
          });
        } catch (err) {
          removeToken();
          this.props.history.replace('/signin');
        }
      }
    }

    render() {
      console.log(this.props.history);
      console.log(this.state.tokenContent);

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
