import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `/api/customers/search?lastName=${searchTerm}`,
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>Search customers by last name</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <button type="submit">Search</button>

      <div className="search-results">
        {searchResults.map((customer, index) => (
          <div key={`${customer.email}-${index}`}>
            <h4>
              {customer.first_name} {customer.last_name}
            </h4>
            <p>Email: {customer.email}</p>
            <p>DOB: {customer.dob}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Search;
