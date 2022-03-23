import React from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import logo from "./logo.svg";
import "./App.css";
import { postData } from "./Http";
 
function App() {
 
  const [data, setData] = React.useState(null);
  const [idToken, setIdToken] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
 
  React.useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
 
  const login = async (googleResponse) => {
    const idToken = googleResponse.tokenId;
    const profile = googleResponse.profileObj;
    const nodeResponse = await postData('/api/user', idToken, profile);
    
    console.log('POST /api/user response: ');
    console.log(nodeResponse);

    if(nodeResponse.status === 201) {
      setIdToken(idToken);
      setProfile(profile);
    } else {
      console.log('google login problem occurred');
      console.log(googleResponse);
    }
  }

  const logout = () => { 
    setIdToken(null);
    setProfile(null);
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      
        <nav>
          <div>
            {!idToken ? 
              <GoogleLogin
                clientId="520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={login}
                onFailure={login}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
              :
              <GoogleLogout
                clientId="520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
              />
            }
          </div>
        </nav>
      </header>
    </div>
  );
}
 
export default App;
