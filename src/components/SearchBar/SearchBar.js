import React, { useState, useCallback } from 'react';
import './SearchBar.css';


export default function SearchBar(props) {
  // const handleSearch = (event) => {
  //   props.setSearchTerm(event.target.value);
  // }
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  return (
    <div className="SearchBar">
      <input type="text" placeholder='Enter A Song, Album, or Artist' onChange={handleTermChange} />
      <button type='submit' className="SearchButton" onClick={search}>Search</button>
    </div>
  )
}