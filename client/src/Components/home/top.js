import { Container, Row, Col } from "react-bootstrap";
import "./style/top.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useState } from "react";
function Top() {
  const languages = [
    {
      code: "ka",
      name: "ಕನ್ನಡ",
    },
    {
      code: "en",
      name: "English",
    },
  ];

  const [currentLanguage, setLan] = useState(
    i18next.language != undefined && i18next.language.localeCompare("en")
      ? 0
      : 1
  );
  const { t } = useTranslation();
  return (
    <div className="bkg">
      <Container fluid>
        <Row
          style={{
            "--bs-gutter-x": "0",
          }}
        >
          <Col className="txt" style={{ flexGrow: 1, paddingLeft: "65px" }}>
            {t("govt_kar")}
            <br /> <p className="dept">{t("dept_eco")}</p>
          </Col>
          <Col
            className="ts"
            style={{
              flexGrow: 0,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
              cursor: "pointer",
            }}
          >
            <p
              className="aa"
              onClick={() => {
                currentLanguage === 0 ? setLan(1) : setLan(0);
                currentLanguage === 0
                  ? i18next.changeLanguage(languages[1].code)
                  : i18next.changeLanguage(languages[0].code);
              }}
              style={{ padding: "7px", marginRight: "10px" }}
            >
              {currentLanguage === 0 ? languages[1].name : languages[0].name}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Top;
