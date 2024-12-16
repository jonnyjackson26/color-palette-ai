import React, { useState } from "react";
import "./Search.css";

const Search = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColors = input.split(",").map((color) => color.trim());
    onSubmit(newColors);
    setInput("");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter hex values (e.g., #FF3B3B, #C68C6C, ...)"
        value={input}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Search;
