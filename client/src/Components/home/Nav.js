import "./style/Nav.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
// import {useDispatch, useselector} from "react-redux";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const inlineCSS = (screenWidth) => {
  if (screenWidth > 950)
    return {
      marginLeft: "auto",
      marginRight: "40px",
    };
  return {};
};

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { loggedIn, setLogin } = useContext(AuthContext);
  const { t } = useTranslation();
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

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
    <nav>
      {(toggleMenu || screenWidth > 950) && (
        <ul className="list" style={{ marginBottom: "0px" }}>
          <li className="items">
            <Link to="/" className="items-name">
              <FontAwesomeIcon className="items-icon" icon={faHouseChimney} />
              {t("home")}
            </Link>
          </li>
          <li className="items">
            <Link to="/about" className="items-name">
              <FontAwesomeIcon className="items-icon" icon={faUserCircle} />

              {t("about_crz")}
            </Link>
          </li>
          <li className="items">
            <Link to="/application" className="items-name">
              <FontAwesomeIcon className="items-icon" icon={faFileLines} />

              {t("new_app")}
            </Link>
          </li>
          <li className="items">
            <Link to="/previous-application" className="items-name">
              <FontAwesomeIcon
                className="items-icon"
                icon={faFileCircleCheck}
              />

              {t("p_p_app")}
            </Link>
          </li>
          <li className="items">
            <Link to="forms" className="items-name">
              <FontAwesomeIcon className="items-icon" icon={faFolderOpen} />

              {t("forms")}
            </Link>
          </li>
          <li className="signIn" style={inlineCSS(screenWidth)}>
            {!loggedIn || !loggedIn.phone ? (
              <Link to="sign-in">{t("sign_in")}</Link>
            ) : (
              <p
                className="signOut"
                onClick={() => {
                  axios
                    .get(
                      SERVER_URL + "/api/auth/logout",
                      {},
                      { withCredentials: true }
                    )
                    .then((res) => {
                      if (res.status === 200 && res.data && res.data.success) {
                        window.location.reload();
                      }
                    });
                }}
              >
                {t("Sign Out")}
              </p>
            )}
          </li>
        </ul>
      )}

      <button onClick={toggleNav} className="btn2">
        {toggleMenu ? "Hide" : "Show"}
      </button>
    </nav>
  );
}
