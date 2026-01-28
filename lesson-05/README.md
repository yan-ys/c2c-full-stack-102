# Lesson 5 — Intro Pokemon App

This lesson is the start of a new project format: one project folder with **two subfolders**:

- `client/` (React front end)
- `server/` (Node/Express back end — placeholder for now)

The Lesson 5 focus is **front-end setup only** (UI + forms). The database connection comes in the next lessons.

## Starter Code Location

Starter project for this lesson is in:

- `lesson-05/app/client`
- `lesson-05/app/server`

## Work To Be Done In The IDE (Lesson 5)

### 1) Understand the project structure

- Confirm you have an `app/` folder with `client/` and `server/` inside.
- Identify where front-end code lives: `client/src/App.js`.
- Identify where back-end code will live later: `server/`.

### 2) Run the client (do this first)

From the repo root:

```bash
cd /workspaces/c2c-full-stack-102/lesson-05/app/client
npm install
npm start
```

Keep the dev server running while you work so you can see changes immediately.

### 3) Add imports to `App.js`

In `/workspaces/c2c-full-stack-102/lesson-05/app/client/src/App.js`, add these imports:

```js
import React from "react";
import pokeball from "./assets/pokeball.svg";
import { Button, Container, Form } from "react-bootstrap";
```

### 4) Add event handlers

Inside `function App() { ... }`, add:

```js
const onSubmitNewItem = (event) => {
  event.preventDefault();
  console.log("SUBMIT clicked");
};

const onSearch = (event) => {
  event.preventDefault();
  console.log("SEARCH clicked");
};
```

### 5) Add the UI (return JSX)

Inside your `return ( ... )`, add:

```jsx
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
```

The provided starter code already includes the Pokeball SVG at `lesson-05/app/client/src/assets/pokeball.svg`.
