import API from "./searchApi";
// import SearchForm from "./SearchForm"
// import SearchResults from "./SearchResults"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const ArticleSearch = () => {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    API.search("Flowers")
      .then((response) => {
        // console.log(response.data);
        setSearch(response.data.articles);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, []);

  function handleSearch(e) {
    // e.preventDefault();
    API.search(e)
      .then((response) => {
        console.log(response.data.articles);
        setSearch(response.data.articles);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  return (
    <>
      <input
        className="form-control nav-search"
        type="text"
        placeholder="What articles are you looking for?"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {search.map((type) => {
        return (
          <div className ="container"> 
          <div key={type.id} className="col-sm-12">
              <div className="card" style={{
                margin: "50px",
              }}>
                <div><h1> {type.title}</h1></div>
                <div> <h3> Article By: {type.author}</h3></div>
              <div
                className="practice image"
                style={{
                  backgroundImage: `url(${type.urlToImage})`,
                  height: "350px",
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                ></div>
                <p> <Link to={type.url}>Read More Here:</Link></p>
            </div>
          </div>
          </div>
        );
      })}
    </>
  );
};


    
export default ArticleSearch;