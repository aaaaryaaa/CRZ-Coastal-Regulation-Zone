import "./App.css";
import { useContext, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "./home/Home";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import OfficeApp from "./office/components/App";
import ScrollButton from "./ScrollButton";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function App() {
  const { setLogin } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/auth/verify", { withCredentials: true })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setLogin({
            phone: response.data.phone,
          });
        } else {
          window.localStorage.removeItem("num");
        }
      })
      .catch((e) => {});
  }, []);

  return (
    <div
      className="crz"
      style={{
        backgroundColor: "#F8F8F8",
      }}
    >
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="office/*" element={<OfficeApp></OfficeApp>}></Route>
        </Routes>
        <ScrollButton/>
      </div>
    </div>
  );
}

export default App;
