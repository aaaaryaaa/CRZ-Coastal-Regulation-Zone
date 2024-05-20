import React from "react";
import "./style/SideCard.css";
import dc from "../../Images/dc.jpg";
import pn from "../../Images/phone.png";
import { useTranslation } from "react-i18next";
function SideCard() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <footer className="comp">
        <div className="container">
          <img className="dcimg" src={dc} />
          <br />
          <br />
          <div className="dctxt">
            {t("name")}
            <br />
            {t("dep_com_udupi")}
          </div>
          <a href="https://twitter.com/dcudupi?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <button className="cntct">
              <img className="pn" src={pn} /> {t("contact")}
            </button>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default SideCard;
