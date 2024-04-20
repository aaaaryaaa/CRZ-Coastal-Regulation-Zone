import { useState } from "react";
import "./Search.css";

const Search = ({ data, setData }) => {
  const [text, setText] = useState("");
  const [searchby, setSearch] = useState("name");
  const [searchResults, setResult] = useState(null);
  const [error, setError] = useState(null);
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (text === "") {
      alert("Please enter something");
    } else {
      var prop = searchby;
      var val = text;
      var results = [];
      if (data != null) {
        data.forEach((e) => {
          if (prop === "name") {
            if (e.name.includes(val)) {
              results.push(e);
            }
          } else if (prop === "AppId") {
            if (e.applicationId.includes(val)) {
              results.push(e);
            }
          } else if (prop === "village") {
            if (e.village.includes(val)) {
              results.push(e);
            }
          } else if (prop === "taluk") {
            if (e.taluk.includes(val)) {
              results.push(e);
            }
          }
        });
      }

      if (results === undefined) {
        setError(true);
      } else {
        setData(results);
      }
    }
  };

  const chgText = (evt) => (setText(evt.target.value), () => {});
  const chgSerch = (evt) => (setSearch(evt.target.value), () => {});
  return (
    <>
      <div className="wrap">
        <form onSubmit={onSubmit}>
          <div className="search">
            <input
              type="text"
              name="text"
              className="searchTerm"
              placeholder="Search application"
              value={text}
              onChange={chgText}
            />
            <button type="submit" className="searchButton">
              Search
            </button>
          </div>
          <select
            name="serchby"
            id="serchby"
            onChange={chgSerch}
            value={searchby}
          >
            <optgroup label="Search by">
              <option>name</option>
              <option>AppId</option>
              <option>village</option>
              <option>taluk</option>
            </optgroup>
          </select>
        </form>
      </div>
    </>
  );
};
export default Search;
