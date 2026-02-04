import React, { useEffect, useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Row,
} from "react-bootstrap";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

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

  const search = async () => {
    console.log("Search for " + searchInput); // Drake

    var artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    // Update this section to get the artist id from the search results
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log(artistID);
    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      artistParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setAlbums(data.items);
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
              search();
            }
          }}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </InputGroup>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album, i) => {
            console.log(album);
            return (
              <Card key={i}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default App;
