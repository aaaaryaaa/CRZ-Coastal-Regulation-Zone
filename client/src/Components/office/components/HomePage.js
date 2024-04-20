import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const Home = () => {
  const cardInfo = [
    {
      title: "Residential Conversion",
      routeTo: "/office/applicationmenu/residentialConversion",
    },
    {
      title: "Residential Construction",
      routeTo: "/office/applicationmenu/residentialConstruction",
    },
    {
      title: "Commercial Conversion",
      routeTo: "/office/applicationmenu/commericalConversion",
    },
    {
      title: "Commercial Construction",
      routeTo: "/office/applicationmenu/commercialConstruction",
    },
    {
      title: "Statistics",
      routeTo: "/office/statistics",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <div key={index} className="col-md-4" style={{marginTop:'-1%'}}>
        <Link to={card.routeTo}>
          <div key={index} className="homeCard">
            <h4 className="Title">{card.title}</h4>
            <br />
            <div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const HomePage = () => {
    return <div className="row" style={{margin:'0'}}>{cardInfo.map(renderCard)}</div>;
  };
  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
