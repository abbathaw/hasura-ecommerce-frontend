import React from "react";

import Header from "./Header";
import jwtDecode from 'jwt-decode';
import {useCognito} from "./Cognito/react-cognito-spa";

const App = ({ idToken }) => {
  const { loading, logout } = useCognito();
  const decodedJwt= jwtDecode(idToken);
  console.log("decodedJWT", decodedJwt);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header logoutHandler={logout} />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-6 sliderMenu p-30">
            <p>Hello</p>
          </div>
          <div className="col-md-6 sliderMenu p-30 bg-gray border-right">

          </div>
        </div>
        <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray">

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
