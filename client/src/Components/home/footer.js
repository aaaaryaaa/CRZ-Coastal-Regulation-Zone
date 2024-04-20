import React from "react";
import { useTranslation } from "react-i18next";
import "./style/footer.css";

function Footer() {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="footer">
        <div className="container1">
          <div className="row1">
            <div className="footer-col">
              <h4>{t("q_links")}</h4>
              <ul>
                <li>
                  <p>{t("about_crzph")}</p>
                </li>
                <li>
                  <p>{t("imp_docs")}</p>
                </li>
                <li>
                  <p>{t("priv_pol")}</p>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t("soc_med")}</h4>
              <ul>
                <li>
                  <p>{t("fb")}</p>
                </li>
                <li>
                  <p>{t("insta")}</p>
                </li>
                <li>
                  <p>{t("twitter")}</p>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t("help_no")}</h4>
              <ul>
                <li>
                  <p>{t("crz_telephone")}</p>
                </li>
                <li>
                  <p>{t("dc_telephone")}</p>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              paddingTop: "10px",
            }}
          >
            {t("Developed by Students, MIT, Manipal")}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
