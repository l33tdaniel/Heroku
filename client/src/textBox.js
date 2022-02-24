import React from "react";
import { useState } from "react";
// const fs = require('fs'); this causes things to crash



 
// some of this stuff has been copied from w3schools and modified. there are a few errors that come up but it seems to work

// how could we make this appear serverside

function Textbox() {
  const [name, setName] = useState("");
  let daniel = "";
  console.log(name); // this allows us to log the name that is there.
  daniel = name;
  console.log("Daniel = " + daniel);
  //writeToFile(daniel);
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
/*
  function writeToFile(text) {

    fs.writeFile("/temp.txt", text, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    }); 
  
}
*/
 
export default Textbox;




//520195381167-pjjrr4u341kgm4emhaagv1idc72lsfur.apps.googleusercontent.com