import React from "react";
import { useState } from "react";
 
// some of this stuff has been copied from w3schools and modified. there are a few errors that come up but it seems to work

// how could we make this appear serverside

function Textbox() {
  const [name, setName] = useState("");
  console.log(name); // this allows us to log the name that is there.
  return (
    <div className="App">
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
    </div>
  );
}
 
export default Textbox;




//520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com