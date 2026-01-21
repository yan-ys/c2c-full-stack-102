import "./App.css";
import { useState, useEffect } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  return (
    <div className="App">
      <h1>MUSIC APP</h1>
      <p>
        Welcome to the Music App! This is a starter React app for searching
        music using the Spotify API. It will be updated!
      </p>
    </div>
  );
}

export default App;
