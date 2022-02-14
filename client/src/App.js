import React from "react";
import GoogleLogin from 'react-google-login';
import logo from "./logo.svg";
import "./App.css";
 
function App() {
 
  const [data, setData] = React.useState(null);
 
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
 
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    console.log(response.profileObj);
 
    const id_token = response.tokenId;
 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/users');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <GoogleLogin
          clientId="520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </header>
      <nav>
        <div>Test</div>

      </nav>
    </div>
  );
}
 
export default App;



//520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com