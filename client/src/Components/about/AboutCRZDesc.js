import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AboutCrzDesc = () => {
  const { t } = useTranslation();
  return (
    <Container
      fluid
      style={{
        maxWidth: "95%",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      <Col>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <h3>{t("crz_short")}</h3>
          <p>{t("crzp")}</p>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <h3>{t("why_crz")}</h3>
          <p>{t("why_crzp")}</p>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <h3>{t("crz_jur")}</h3>
          <p>{t("crz_jurp")}</p>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
            width: "95%",
          }}
        >
          <h3>{t("crz_len_cov")}</h3>
          <ul style={{ marginLeft: 30 }}>
            {t("crz_len_covp")}
            <li>{t("crz_len_l2")}</li>
            <li>{t("crz_len_l3")}</li>
            <li>{t("crz_len_l4")}</li>
            <li>{t("crz_len_l5")}</li>
            <li>{t("crz_len_l6")}</li>
            <li>{t("crz_len_l7")}</li>
          </ul>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <h3>{t("crz_map")}</h3>
          <h5>{t("map_sea_coast")}</h5>
          <img
            alt=""
            src={require("../../Images/img1.jpg")}
            style={{ maxHeight: 600 }}
          />
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <h5 style={{ marginTop: 30, marginBottom: 20 }}>{t("map_tidal")}</h5>
          <img
            alt=""
            src={require("../../Images/img2.jpg")}
            style={{ maxHeight: 600 }}
          />
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
            width: "95%",
          }}
        >
          <h3 style={{ marginTop: 40 }}>{t("crz_categories")}</h3>
          <ul style={{ marginLeft: 30 }}>
            <li style={{ fontWeight: 500 }}>{t("crz_categoriesp")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat2")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat3")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat4")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat5")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat6")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat7")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat8")}</li>
            <li style={{ fontWeight: 500 }}>{t("crz_cat9")}</li>
          </ul>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <img
            alt=""
            src={require("../../Images/img3.jpg")}
            style={{ maxHeight: 700, marginTop: 40 }}
          />
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
            width: "95%",
          }}
        >
          <h3 style={{ marginTop: 30, marginBottom: 20 }}>
            {t("types_application")}
          </h3>
          <p>{t("types_applicationp")}</p>
          <p>{t("type2")}</p>
          <p>{t("type3")}</p>
          <p>{t("type4")}</p>
          <p>{t("type5")}</p>
          <p>{t("type6")}</p>
          <p>{t("type7")}</p>
        </Row>
      </Col>
    </Container>
  );
};

export default AboutCrzDesc;
