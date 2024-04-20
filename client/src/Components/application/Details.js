import TextBox from "./CustomTextBox";
import UploadBtn from "./uploadButton";
import DropDown from "./DetailsDropDown";
import "./styles/form.css";
import { useReducer, useState ,  useRef } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

import { Buffer } from "buffer";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function reducer(state, action) {
  switch (action.type) {
    case "input":
      return { ...state, [action.field]: action.value };
    case "submit":
      if (action.checked) {
        if (
          action.state.formOne === null ||
          action.state.rtc === null ||
          action.state.challan === null ||
          action.state.surveySketch === null ||
          action.state.phone === "" ||
          action.state.name === "" ||
          action.state.email === "" ||
          action.state.address === "" ||
          action.state.surveyNo === "" ||
          action.state.type === ""
        ) {
          alert("Incorrect data");
          return action.state;
        }
        action.setLoading(true);
        const formData = new FormData();
        formData.append(
          "formOne",
          action.state.formOne,
          action.state.formOne.name
        );
        formData.append("rtc", action.state.rtc, action.state.rtc.name);
        formData.append(
          "challan",
          action.state.challan,
          action.state.challan.name
        );
        formData.append(
          "surveySketch",
          action.state.surveySketch,
          action.state.surveySketch.name
        );
        formData.append("phone", action.state.phone);
        formData.append("name", action.state.name);
        formData.append("email", action.state.email);
        formData.append("address", action.state.address);
        formData.append("surveyNo", action.state.surveyNo);
        formData.append("village", action.state.village);
        formData.append("taluk", action.state.taluk);
        formData.append("type", action.state.type);
        axios
          .post(SERVER_URL + "/api/application/submit", formData, {
            withCredentials: true,
          })
          .then((response) => {
            if (
              response.status === 200 &&
              response.data &&
              response.data.success
            ) {
              alert(
                `Application submitted. Application ID : ${response.data.applicationId}`
              );
            }
            action.setLoading(false);
          });
        return {
          name: "",
          email:"",
          address: "",
          phone: action.state.phone,
          surveyNo: "",
          village: "",
          taluk: "",
          type: "",
          formOne: null,
          rtc: null,
          surveySketch: null,
          challan: null,
        };
      } else {
        alert("Please tick the checkbox");
      }
    default:
      return state;
  }
}

function Details({ phone }) {
  const [checked, setChecked] = useState(false);
  const locationData = {
    Udupi: [
      "Ambalpady",
      "Anjaru",
      "Athradi",
      "Badanidiyuru",
      "Bellampalli",
      "Herga",
      "Kadekar",
      "Kidiyuru",
      "Kodavuru",
      "Kukkehalli",
      "Kuthpadi",
      "Manipura",
      "Mooduthonse",
      "Putturu",
      "Paduthonse",
      "Shivalli",
      "Thenkanidiyuru",
      "Udyavara",
    ],
    Kapu: [
      "Bada",
      "Palimaru",
      "Hejamadi",
      "Innanje",
      "Kote",
      "Kurkalu",
      "Mattu",
      "Moodabettu",
      "Muluru",
      "Nadsalu",
      "Padu",
      "Pangala",
      "Thenka",
      "Uliyaragoli",
      "Yenagudde",
    ],
    Kota: [
      "Balkudru",
      "Gundmi",
      "Hanehalli",
      "Herur",
      "Hosala",
      "Irodi",
      "Kacchuru",
      "Kodi",
      "Kotathattu",
      "Manuru",
      "Moodahadu",
      "Pandeshwara",
      "Perampalli",
    ],
    Brahmavara: [
      "Baikadi",
      "Handadi",
      "Haradi",
      "Havanje",
      "Kumragodu",
      "Matapadi",
      "Neelavara",
      "Uppuru",
      "Varamballi",
    ],
    Bynduru: [
      "Bijuru",
      "Bynduru",
      "Hadavu",
      "Heranjalu",
      "Kambadakone",
      "Kergalu",
      "Kirimanjeshwara",
      "Maravanthe",
      "Nada",
      "Nandanavana",
      "Navunda",
      "Senapura",
      "Paduvari",
      "Shiruru",
      "Taggarse",
      "Uppunda",
      "Yadthare",
    ],

    Kundapura: [
      "Angalli",
      "Basruru",
      "Beejadi",
      "Balkuru",
      "Gopadi",
      "Gulwadi",
      "Hangluru",
      "Koni",
      "Koteshwara",
      "Kumbhashi",
      "Kundapura",
      "Vaderahobli",
      "Thekkatte",
    ],
    Vandse: [
      "Gangolli",
      "Gujjadi",
      "Hakladi",
      "Hattiangadi",
      "Hemmadi",
      "Kattabelthuru",
      "Hosadu",
      "Talluru",
      "Trasi",
      "Uppinakudru",
    ],
  };

 const typeData=
  [
    "Residential Conversion",
    "Commercial Conversion",
    "Residential Construction",
    "Commercial/Govt. Projects",
  ];
        


      
 

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    address: "",
    phone: phone,
    surveyNo: "",
    village: "",
    taluk: "",
    type: "",
    formOne: null,
    rtc: null,
    surveySketch: null,
    challan: null,
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    dispatch({
      type: "submit",
      state: state,
      checked: checked,
      
      setLoading: setLoading,
    });

    emailjs
      .sendForm(
        "service_m4vurxd",
        "template_gtdf0m6",
        form.current,
        "6lhS34GS0paQM-LBS"
      )
      .then(() => {
        console.log("mail sent");
    });
     
  };



  return (
    <div
      className="details"
      style={{
        marginTop: "2rem",
        padding: 0,
      }}
    >
      {loading ? (
        <div></div>
      ) : (
        <form ref={form} action="" className="mainForm"  onSubmit={sendEmail} >
          <TextBox
            title={t("name_applicant")}
            value={state.name}
            name="user_name"
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "name",
               name:"user_name",
                value: text.target.value,
              });
            }}
          />
                    <TextBox
            title={t("email_id")}
            value={state.email}
            name="user_email"
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "email",
                name:"user_email",
                
                value: text.target.value,
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
                });
              }}
            ></textarea>
          </div>

          <TextBox
            title={t("survey_no")}
            name="surveyno"
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "surveyNo",
            
                value: text.target.value,
              });
            }}
            value={state.surveyNo}
          />

          <DropDown
            title={t("taluk")}
         
            options={Object.keys(locationData)}
            value={state.taluk}
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "taluk",
                value: text.target.value,
              });
            }}
          />
          <DropDown
            title={t("village")}
            
            options={state.taluk === "" ? [] : locationData[state.taluk]}
            value={state.village}
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "village",
                value: text.target.value,
              });
            }}
          />
          <DropDown
            title={t("type")}
            
           
            // options={[
            //   "Residential Conversion",
            //   "Commercial Conversion",
            //   "Residential Construction",
            //   "Commercial/Govt. Projects",
            // ]}
            options={typeData.map((value) => t(value))}
            //  options={Object.values(typeData)}
            value={state.type}
            onChange={(text) => {
              dispatch({
                type: "input",
                field: "type",
                value: text.target.value,
              });
            }}
          />
          <UploadBtn
            title={t("up_f1")}
            onChange={(file) => {
              dispatch({
                type: "input",
                field: "formOne",
                value: file.target.files[0],
              });
            }}
          />
          <UploadBtn
            title={t("up_rtc")}
            onChange={(file) => {
              dispatch({
                type: "input",
                field: "rtc",
                value: file.target.files[0],
              });
            }}
          />
          <UploadBtn
            title={t("up_sketch")}
            onChange={(file) => {
              dispatch({
                type: "input",
                field: "surveySketch",
                value: file.target.files[0],
              });
            }}
          />
          <UploadBtn
            title={t("challan")}
            onChange={(file) => {
              dispatch({
                type: "input",
                field: "challan",
                value: file.target.files[0],
              });
            }}
          />

          <div className="check">
            <input
              type="checkbox"
              onChange={(e) => {
                setChecked(e.target.value);
              }}
              style={{ flexGrow: 0, width: "fit-content" }}
            />
            <div
              style={{
                width: "2px",
              }}
            ></div>
            <span style={{ color: "red", flexGrow: 1 }}>{t("submit_doc")}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              value="Send"
              style={{
                backgroundColor: "#4089c8",
              }}
              // onClick={sendEmail}

              // onClick={(e) => {
              //   // onClick={sendEmail}
              //     e.preventDefault();
              //     dispatch({
              //       type: "submit",
              //       state: state,
              //       checked: checked,
              //       setLoading: setLoading,
              //     });
              //   }}
            >
              {t("submit_button")}
             
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Details;
