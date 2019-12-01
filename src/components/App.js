import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import {useCognito} from './Cognito/react-cognito-spa';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import Page from './Page';
import Loading from './Cognito/Loading';
import NProgress from 'nprogress';

const App = ({idToken}) => {
  const {loading} = useCognito();
  const decodedJwt = jwtDecode(idToken);
  console.log('decodedJWT', decodedJwt);
  if ( loading ) {
    return <Loading/>;
  }
  return (
      <Router>
        <Page>
          <div>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
            </Switch>
          </div>
        </Page>
      </Router>
  );
};

function Home() {
  const [hasRendered, setHasRendered] = useState(false);
  let location = useLocation();
  
  useEffect(() => {
    NProgress.done();
    setHasRendered(true);
  }, [location]);
  
  if ( !hasRendered ) {
    NProgress.start();
  }
  return (
      <div>
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
}

export default App;
