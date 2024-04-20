import "./style/home.css";
import React from "react";

import AboutCRZ from "./aboutCRZ";

import Nav from "./Nav";
import Top from "./top";
import Img from "./img";
import Gallery from "./Gallery";
import About from "./aboutCRZ";
import SideCard from "./SideCard";
import Left from "./left";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NewApplication from "../application/NewApplication";
import LoginPage from "../signIn/signIn";
import AboutCrzDesc from "../about/AboutCRZDesc";
import PendingPrevious from "../pending/PendingPrevious";
import PendingApp from "../pend, prev application/PendingApp";
import PreviousApp from "../pend, prev application/PreviousApp";
import UploadDocuments from "../pend, prev application/UploadDocuments";
import FormsPage from "../forms/FormsPage";
function HomePage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <div>
      <div className="myNav">
        <Top />
        <Img />
        <Nav />
      </div>
      <Routes>
        <Route
          path="/*"
          element={
            <div>
              <Gallery />
              <div className="middle">
                {screenWidth > 950 && <Left />}
                <AboutCRZ />
                {screenWidth > 950 && <SideCard />}
              </div>
            </div>
          }
        />
        <Route path="/application" element={<NewApplication />}></Route>
        <Route path="/sign-in" element={<LoginPage />}></Route>
        <Route path="/about" element={<AboutCrzDesc />}></Route>
        <Route
          path="/previous-application"
          element={<PendingPrevious />}
        ></Route>
        <Route path="/pending/:id" element={<PendingApp />}></Route>
        <Route path="/previous/:id" element={<PreviousApp />}></Route>
        <Route path="/upload/:id" element={<UploadDocuments />} />

        <Route path="/forms" element={<FormsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default HomePage;
