import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log("retrieved token:", data.access_token);
      });
  }, []);

  //Placeholder function for search
  const search = async () => {
    console.log(`searched clicked for artist ${searchInput}`);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3">Music Search</h1>

      <InputGroup className="mb-3" size="lg">
        <FormControl
          placeholder="Enter an artist name"
          value={searchInput}
          type="input"
          onKeyDown={(event) => {
            console.log("key pressed:", event.key);
            if (event.key === "Enter") {
              search();
            }
          }}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </InputGroup>
    </Container>
  );
}

export default App;
