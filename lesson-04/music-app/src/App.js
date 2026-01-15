import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

const CLIENT_ID = "42a586352ead4647a29602325f895e15";
const CLIENT_SECRET = "1e3aa9b91f55475c8989124bfc8366ec";

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

  const handleSearchClick = () => {
    console.log("clicked button");

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var artistID = fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
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
              handleSearchClick();
            }
          }}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button variant="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </InputGroup>
    </Container>
  );
}

export default App;
