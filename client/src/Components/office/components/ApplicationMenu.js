import React, { useState, useEffect } from "react";
import "./ApplicationMenu.css";
import Box from "./box";
import Search from "./Search";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ApplicationMenu = (props) => {
  const [active, setActive] = useState("");
  function onSelect(application) {
    props.onSelect(application);
  }

  const { applicationType } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [datacopy, setDataCopy] = useState(null);
  const typeMap = {
    residentialConversion: "Residential Conversion",
    commericalConversion: "Commercial Conversion",
    residentialConstruction: "Residential Construction",
    commercialConstruction: "Commercial Construction",
  };

  useEffect(() => {
    const type = typeMap[applicationType];
    axios
      .post(
        SERVER_URL + "/api/application/appByType",
        {
          type: type,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setData(response.data.applications);
          setDataCopy(response.data.applications);
          setLoading(false);
          setActive("pending");
        }
      });
  }, []);

  useEffect(() => {
    var newList = [];

    if (datacopy != null && active.length > 0) {
      datacopy.forEach((e) => {
        if (active === e.status) {
          newList.push(e);
        }
      });
      setData(newList);
    }
  }, [active]);

  return (
    <Container>
      {loading ? (
        <p> Loading </p>
      ) : (
        <>
          <div className="sidebar">
            <div className="sidebar__menu">
              <button
                type="button"
                onClick={() => setActive("pending")}
                className={`sidebar__menu__item ${
                  active === "pending" ? "active" : ""
                }`}
              >
                New Applications
              </button>
              <button
                type="button"
                onClick={() => setActive("ready")}
                className={`sidebar__menu__item ${
                  active === "ready" ? "active" : ""
                }`}
              >
                Pending Applications
              </button>
              <button
                type="button"
                onClick={() => setActive("seen")}
                className={`sidebar__menu__item ${
                  active === "seen" ? "active" : ""
                }`}
              >
                Seen Applications
              </button>
              <button
                type="button"
                onClick={() => setActive("approved")}
                className={`sidebar__menu__item ${
                  active === "approved" ? "active" : ""
                }`}
              >
                Cleared Applications
              </button>
            </div>
          </div>
          <Box
            Applications={data}
            onClick={(application) => onSelect(application)}
          />
          <Search data={datacopy} setData={setData} />
        </>
      )}
    </Container>
  );
};

export default ApplicationMenu;
