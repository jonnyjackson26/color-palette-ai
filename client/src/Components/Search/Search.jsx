import React, { useState } from "react";
import "./Search.css";

const Search = ({ onPaletteGenerated }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/generate-palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.palette) {
        onPaletteGenerated(data.palette); // Send palette back to App.jsx
      } else {
        setError("Failed to generate palette. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="search">
      <h2 className="search-title">Create me a color palette that reminds me of...</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Type here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
