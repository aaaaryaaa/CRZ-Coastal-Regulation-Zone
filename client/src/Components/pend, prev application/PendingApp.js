import TextBox from "./CustomTextBox";
import UploadBtn from "./uploadButton";
import DropDown from "./DetailsDropDown";
import "./styles/form.css";
import { Button, Form, Row } from "react-bootstrap";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

// import { Stepper, Step } from 'react-form-stepper';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function reducer(state, action) {
  switch (action.type) {
    case "input":
      if (action.modify) return { ...state, [action.field]: action.value };
      else return state;
    case "submit":
      action.setLoading(true);

      return {
        name: "",
        email: "",
        address: "",
        phone: "",
        surveyNo: "",
        village: "",
        taluk: "",
        type: "",
        formOne: null,
        rtc: null,
        surveySketch: null,
        challan: null,
      };
    default:
      return state;
  }
}

function PendingApp() {






  const [width, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();

  const { data, canModify } = location.state;

  const history = useNavigate();
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const [state, dispatch] = useReducer(reducer, data);
  const [modify, setModify] = useState(canModify);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  return (
    <Container
      className="details"
      style={{
        marginTop: "2rem",
        padding: 0,
        width: width > 960 ? "60%" : "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <div></div>
      ) : (
        <Container
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <Row
            style={{
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* <h2>{data.application}</h2> */}
          </Row>
          <form action="" className="mainForm">


            

            <TextBox
              title={t("name_applicant")}
              value={state.name}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "name",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <TextBox
              title={t("email_id")}
              value={state.email}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "email",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <div className="addressArea">
              <label htmlFor="textArea">{t("address")}</label>
              <textarea
                id="textArea"
                value={state.address}
                onChange={(text) => {
                  dispatch({
                    type: "input",
                    field: "address",
                    value: text.target.value,
                    modify: modify,
                  });
                }}
              ></textarea>
            </div>
            <TextBox
              title={t("mob_no")}
              value={state.phone}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "phone",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <TextBox
              title={t("survey_no")}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "surveyNo",
                  value: text.target.value,
                  modify: modify,
                });
              }}
              value={state.surveyNo}
            />
            <DropDown
              title={t("village")}
              options={["Village1", "Village2", "Village3"]}
              value={state.village}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "village",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <DropDown
              title={t("taluk")}
              options={["Taluk1", "Taluk2"]}
              value={state.taluk}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "taluk",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <DropDown
              title={t("type")}
              options={[
                "Residential Conversion",
                "Commercial Conversion",
                "Residential Construction",
                "Commercial/Govt. Projects",
              ]}
              value={state.type}
              onChange={(text) => {
                dispatch({
                  type: "input",
                  field: "type",
                  value: text.target.value,
                  modify: modify,
                });
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                style={{
                  backgroundColor: "#4089c8",
                }}
                onClick={(e) => {
                  history(`/upload/${data.id}`);
                }}
              >
                Upload Documents
              </Button>
            </div>
          </form>
        </Container>
      )}
    </Container>
  );
}

export default PendingApp;
