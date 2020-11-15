import API from "./searchApi";
import React, { useState, useEffect } from "react";
import "./ArticleSearch.css";

const ArticleSearch = () => {
  const [search, setSearch] = useState([]);

  const [type, setType] = useState({
    title: "",
    url: "",
    imageUrl: "",
  });

  useEffect(() => {
    API.search("Flowers")
      .then((response) => {
        // console.log(response.data);
        setSearch(response.data.response.results);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, []);

  function handleSearch(e) {
    // e.preventDefault();
    API.search(e)
      .then((response) => {
        console.log(response.data.response);
        setSearch(response.data.response.results);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  function handleFormSubmit(title, url, image) {
    console.log(title);

    setType({
      title: title,
      url: url,
      image: image,
    });
    API.saveArticle({
      title: title,
      url: url,
      imageUrl: image,
    });
    alert("Saved article to your account!");
  }

  return (
    <>
      <input
        className="form-control nav-search text-center"
        id="articlesSearchBar"
        type="text"
        placeholder="e.g. Houseplants"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {search.map((type) => {
        return (
          <div className="container" id="articlesContainer">
            <div key={type.id} className="col-sm-12">
              <div
                className="card"
                style={{
                  margin: "50px",
                }}
              >
                <div>
                  <h2> {type.webTitle}</h2>
                </div>
                <div>
                  {/* <h3> Article Type: {type.sectionName}</h3> */}
                </div>
                <div
                  className="practice image"
                  style={{
                    backgroundImage: `url(${type.fields.thumbnail})`,
                    height: "350px",
                    width: "100%",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="row buttonRow">
                  <button className="articlesBtn">
                    <a href={type.webUrl}>More Info</a>
                  </button>
                  <button
                    className="articlesBtn"
                    onClick={() =>
                      handleFormSubmit(
                        type.webTitle,
                        type.webUrl,
                        type.fields.thumbnail
                      )
                    }
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ArticleSearch;
