import React from "react";
import pokeball from "./assets/pokeball.svg";
import { Button, Container, Form } from "react-bootstrap";

function App() {
  const onSubmitNewItem = (event) => {
    event.preventDefault();
    console.log("SUBMIT clicked");
  };

  const onSearch = (event) => {
    event.preventDefault();
    console.log("SEARCH clicked");
  };
  return (
    <Container>
      <div className="d-flex align-items-center gap-2 mb-3">
        <img width={40} height={40} alt="Pokeball" src={pokeball} />
        <h1 className="m-0">Pokemon Tracker</h1>
      </div>
      <Container className="add-form border rounded p-3 mb-3">
        <h2>Add a new Pokemon</h2>

        <Form onSubmit={onSubmitNewItem}>
          <Form.Group className="mb-3">
            <Form.Label>Pokemon name</Form.Label>
            <Form.Control placeholder="e.g. Bulbasaur" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pokemon type</Form.Label>
            <Form.Control placeholder="e.g. Grass" />
          </Form.Group>
          <Button className="mt-2" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Container>
      <Container className="search-form border rounded p-3">
        <h2>Search by type</h2>
        <Form onSubmit={onSearch}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control placeholder="e.g. Water" />
          </Form.Group>
          <Button className="mt-2" type="submit" variant="success">
            Search
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default App;
