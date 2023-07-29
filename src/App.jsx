import React, {useState} from "react";
import axios from "axios";
import {DebounceInput} from 'react-debounce-input';
import "./App.css";


function App() {
  const [searchList, setSearchList] = useState([]);

  const getSearchList = async (input) => {
    if(input !== ""){
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${input}`
        );
        setSearchList(response.data.items);
      } catch (error) {
        console.log("request error");
      }
    }else{
      setSearchList([])
    }
  };
  const handleInputChange = (e) => {
    getSearchList(e.target.value);
  };

  return (
    <div className="App">
      {
        <div className="container">
          <h1>Find A Book</h1>
          <div className="inputBox-container">
            <label>
              <DebounceInput
                minLength={2}
                id="message-text"
                name="message-text"
                type="text"
                placeholder="Enter message here"
                debounceTimeout={500}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="displaySearchList">
            <ul>
              {searchList.map((item, index) => {
                return <li key={index}>{item.volumeInfo.title}</li>;
              })}
            </ul>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
